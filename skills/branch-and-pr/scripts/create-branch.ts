#!/usr/bin/env node
/**
 * Create a git branch from a Jira ticket
 * Usage: node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/create-branch.ts --ticket FB-1
 */

import { execSync } from 'child_process';
import { parseArgs } from 'util';
import { JiraConfig } from '../../../lib/jira-config.js';
import { JiraClient } from '../../../lib/jira-client.js';
import { sanitizeBranchName, getBranchPrefix, getCurrentBranch, hasUncommittedChanges } from '../../../lib/git-utils.js';

interface Options {
  ticket: string;
  noPush: boolean;
  noTransition: boolean;
}

function parseArguments(): Options {
  const { values } = parseArgs({
    options: {
      ticket: { type: 'string', short: 't' },
      'no-push': { type: 'boolean', default: false },
      'no-transition': { type: 'boolean', default: false },
    },
    strict: true,
  });

  if (!values.ticket) {
    console.error('❌ Error: --ticket is required');
    console.error('Usage: create-branch.ts --ticket FB-1');
    process.exit(1);
  }

  return {
    ticket: values.ticket,
    noPush: values['no-push'] ?? false,
    noTransition: values['no-transition'] ?? false,
  };
}

async function main() {
  const options = parseArguments();
  const ticketKey = options.ticket.toUpperCase();

  console.log(`\n🎫 Creating branch for ${ticketKey}...\n`);

  // Check for uncommitted changes
  if (hasUncommittedChanges()) {
    console.error('❌ You have uncommitted changes. Please commit or stash them first.');
    process.exit(1);
  }

  // Load Jira config
  const config = JiraConfig.load();
  if (!config) {
    console.error('❌ Jira configuration not found.');
    console.error('   Create a .env file with JIRA_URL, JIRA_EMAIL, JIRA_API_TOKEN');
    process.exit(1);
  }

  const client = new JiraClient(config);

  // Fetch ticket details
  console.log('📥 Fetching ticket details...');
  const ticket = await client.getIssue(ticketKey);
  
  if (!ticket) {
    console.error(`❌ Ticket ${ticketKey} not found`);
    process.exit(1);
  }

  const summary = ticket.fields.summary;
  const issueType = ticket.fields.issuetype?.name || 'Task';

  console.log(`   Summary: ${summary}`);
  console.log(`   Type: ${issueType}`);

  // Generate branch name
  const prefix = getBranchPrefix(issueType);
  const safeName = sanitizeBranchName(summary);
  const branchName = `${prefix}/${ticketKey.toLowerCase()}-${safeName}`;

  console.log(`\n🌿 Branch name: ${branchName}`);

  // Check if branch already exists
  try {
    const existingBranches = execSync('git branch -a', { encoding: 'utf-8' });
    if (existingBranches.includes(branchName)) {
      console.log('⚠️  Branch already exists. Switching to it...');
      execSync(`git checkout ${branchName}`, { stdio: 'inherit' });
      console.log(`\n✅ Switched to existing branch: ${branchName}`);
      return;
    }
  } catch (e) {
    // Ignore errors
  }

  // Create and checkout branch
  console.log('\n📝 Creating branch...');
  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });

  // Push to origin
  if (!options.noPush) {
    console.log('\n📤 Pushing to origin...');
    try {
      execSync(`git push -u origin ${branchName}`, { stdio: 'inherit' });
    } catch (e) {
      console.error('⚠️  Failed to push. You can push later with: git push -u origin ' + branchName);
    }
  }

  // Transition ticket to In Progress (optional)
  if (!options.noTransition) {
    console.log('\n🔄 Updating Jira status...');
    try {
      await client.transitionIssue(ticketKey, 'In Progress');
      console.log('   Transitioned to "In Progress"');
    } catch (e) {
      console.log('   ⚠️  Could not transition ticket (may already be in progress)');
    }

    // Add comment
    try {
      await client.addComment(ticketKey, `Started working on this ticket.\nBranch: \`${branchName}\``);
      console.log('   Added comment to ticket');
    } catch (e) {
      // Ignore comment errors
    }
  }

  console.log(`\n✅ Branch created successfully!`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Make your changes`);
  console.log(`   2. Commit: git commit -am "feat: your message"`);
  console.log(`   3. Create PR: node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/create-pr.ts --ticket ${ticketKey}`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
