#!/usr/bin/env npx ts-node --esm
/**
 * Start Work on a Jira Ticket
 * Fetches details, creates branch, and transitions status
 */

import { Command } from 'commander';
import { getJiraConfig, validateConfig } from '../../../lib/jira-config.js';
import { JiraClient } from '../../../lib/jira-client.js';
import { createBranch, pushBranch, hasUncommittedChanges } from '../../../lib/git-utils.js';

const program = new Command();

program
  .name('start-work')
  .description('Start working on a Jira ticket')
  .requiredOption('--ticket <ticketId>', 'Jira ticket ID (e.g., SAM1-123)')
  .option('--no-branch', 'Skip branch creation')
  .option('--no-transition', 'Skip status transition')
  .option('--no-push', 'Don\'t push branch to remote')
  .parse();

const options = program.opts();

function extractTextFromAdf(adf: any): string {
  if (!adf || !adf.content) return '';
  
  const extractText = (node: any): string => {
    if (node.type === 'text') return node.text || '';
    if (node.content) return node.content.map(extractText).join('');
    return '';
  };
  
  return adf.content.map(extractText).join('\n');
}

async function main() {
  const config = getJiraConfig();
  if (!validateConfig(config)) {
    process.exit(1);
  }

  // Check for uncommitted changes
  if (options.branch && hasUncommittedChanges()) {
    console.error('❌ You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }

  console.log(`🎫 Starting work on ${options.ticket}...`);
  console.log('');

  const client = new JiraClient(config);

  try {
    // 1. Fetch ticket details
    console.log('📋 Fetching ticket details...');
    const issue = await client.getIssue(options.ticket);
    
    console.log('');
    console.log(`   ${issue.fields.issuetype.name}: ${issue.fields.summary}`);
    console.log(`   Status: ${issue.fields.status.name}`);
    if (issue.fields.priority) {
      console.log(`   Priority: ${issue.fields.priority.name}`);
    }
    console.log(`   URL: ${config.url}/browse/${issue.key}`);
    
    if (issue.fields.description) {
      console.log('');
      console.log('📝 Description:');
      console.log(extractTextFromAdf(issue.fields.description).split('\n').map(l => `   ${l}`).join('\n'));
    }
    console.log('');

    // 2. Create branch
    if (options.branch) {
      console.log('🌿 Creating branch...');
      const branchName = createBranch(
        issue.key,
        issue.fields.summary,
        issue.fields.issuetype.name
      );
      console.log(`   ✓ Created: ${branchName}`);

      if (options.push) {
        console.log('');
        console.log('📤 Pushing to remote...');
        pushBranch(branchName);
        console.log(`   ✓ Pushed to origin/${branchName}`);
      }
    }

    // 3. Transition to In Progress
    if (options.transition) {
      console.log('');
      console.log('🔄 Transitioning to In Progress...');
      try {
        await client.transitionIssue(issue.key, 'In Progress');
        console.log('   ✓ Status updated');
      } catch (error) {
        console.log(`   ⚠️ Could not transition: ${error}`);
      }

      // Add comment
      try {
        await client.addComment(issue.key, 'Started working on this ticket.');
        console.log('   ✓ Added comment');
      } catch (error) {
        console.log(`   ⚠️ Could not add comment: ${error}`);
      }
    }

    console.log('');
    console.log('🎉 Ready to work!');
    console.log(`   Ticket: ${config.url}/browse/${issue.key}`);
    
  } catch (error) {
    console.error(`❌ Failed: ${error}`);
    process.exit(1);
  }
}

main();
