#!/usr/bin/env npx ts-node --esm
/**
 * Create a Jira Ticket with full configuration options
 * 
 * Usage:
 *   npx ts-node --esm create-ticket.ts --summary "Ticket summary" [OPTIONS]
 */

import { Command } from 'commander';
import { getJiraConfig, validateConfig } from '../../../lib/jira-config.js';
import { JiraClient } from '../../../lib/jira-client.js';
import { createBranch, pushBranch, createPullRequest } from '../../../lib/git-utils.js';

const program = new Command();

program
  .name('create-ticket')
  .description('Create Jira ticket with full configuration options')
  .requiredOption('-s, --summary <summary>', 'Ticket summary/title (required)')
  .option('-p, --project <project>', 'Jira project key', 'SAM1')
  .option('-t, --type <type>', 'Issue type: Story, Task, Bug, Epic', 'Task')
  .option('-d, --description <description>', 'Detailed description')
  .option('--priority <priority>', 'Priority: Highest, High, Medium, Low, Lowest')
  .option('--labels <labels>', 'Comma-separated labels')
  .option('-ac, --acceptance-criteria <criteria...>', 'Acceptance criteria (can specify multiple)')
  .option('--assignee <assignee>', 'Assign to user (account ID)')
  .option('--create-branch', 'Create a git branch for this ticket')
  .option('--create-pr', 'Create a pull request (requires --create-branch)')
  .option('--no-push', 'Don\'t push branch to remote')
  .option('--dry-run', 'Show what would be created without actually creating')
  .parse();

const options = program.opts();

async function main() {
  // Validate options
  if (options.createPr && !options.createBranch) {
    console.error('❌ --create-pr requires --create-branch');
    process.exit(1);
  }

  // Parse labels
  const labels = options.labels ? options.labels.split(',').map((l: string) => l.trim()) : undefined;

  // Get and validate config
  const config = getJiraConfig();
  if (!validateConfig(config)) {
    process.exit(1);
  }

  if (options.dryRun) {
    console.log('🔍 Dry run - would create:');
    console.log(`   Project: ${options.project}`);
    console.log(`   Type: ${options.type}`);
    console.log(`   Summary: ${options.summary}`);
    if (options.description) console.log(`   Description: ${options.description.substring(0, 100)}...`);
    if (options.priority) console.log(`   Priority: ${options.priority}`);
    if (labels) console.log(`   Labels: ${labels.join(', ')}`);
    if (options.acceptanceCriteria) {
      console.log('   Acceptance Criteria:');
      options.acceptanceCriteria.forEach((ac: string) => console.log(`     - ${ac}`));
    }
    if (options.createBranch) console.log(`   Would create branch: feature/${options.project.toLowerCase()}-xxx-...`);
    if (options.createPr) console.log('   Would create PR');
    return;
  }

  console.log(`📝 Creating Jira ticket in ${options.project}...`);
  console.log(`   Type: ${options.type}`);
  console.log(`   Summary: ${options.summary}`);

  const client = new JiraClient(config);

  try {
    const ticket = await client.createTicket({
      project: options.project,
      summary: options.summary,
      description: options.description,
      issueType: options.type,
      priority: options.priority,
      labels,
      acceptanceCriteria: options.acceptanceCriteria,
      assignee: options.assignee,
    });

    console.log(`\n✅ Created ticket: ${ticket.key}`);
    console.log(`   URL: ${ticket.url}`);

    if (!options.createBranch) {
      console.log(`\n💡 To start working on this ticket:`);
      console.log(`   npx ts-node --esm .github/skills/skills/work-on-ticket/scripts/start-work.ts --ticket ${ticket.key}`);
      return;
    }

    console.log('\n🌿 Creating git branch...');
    try {
      const branchName = createBranch(ticket.key, options.summary, options.type);
      console.log(`   ✓ Created branch: ${branchName}`);

      if (options.push !== false) {
        console.log('\n📤 Pushing to remote...');
        pushBranch(branchName);
        console.log(`   ✓ Pushed to origin/${branchName}`);
      }

      if (options.createPr) {
        console.log('\n🔀 Creating Pull Request...');
        const prUrl = await createPullRequest(
          branchName,
          ticket.key,
          options.summary,
          ticket.url,
          options.description
        );

        if (prUrl) {
          console.log(`   ✓ Created PR: ${prUrl}`);
        }
      }

      console.log('\n🎉 Complete!');
      console.log(`   Ticket: ${ticket.url}`);
      console.log(`   Branch: ${branchName}`);
    } catch (error) {
      console.error(`   ❌ Git operation failed: ${error}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Failed to create ticket: ${error}`);
    process.exit(1);
  }
}

main();
