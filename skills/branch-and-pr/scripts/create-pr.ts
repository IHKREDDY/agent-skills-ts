#!/usr/bin/env node
/**
 * Create a Pull Request from current branch to main
 * Usage: node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/create-pr.ts --ticket FB-1
 */

import { execSync } from 'child_process';
import { parseArgs } from 'util';
import { JiraConfig } from '../../../lib/jira-config.js';
import { JiraClient } from '../../../lib/jira-client.js';
import { getCurrentBranch, getDefaultBranch } from '../../../lib/git-utils.js';

interface Options {
  ticket: string;
  base: string;
  draft: boolean;
}

function parseArguments(): Options {
  const { values } = parseArgs({
    options: {
      ticket: { type: 'string', short: 't' },
      base: { type: 'string', short: 'b' },
      draft: { type: 'boolean', default: true },
      'no-draft': { type: 'boolean', default: false },
    },
    strict: true,
  });

  if (!values.ticket) {
    console.error('❌ Error: --ticket is required');
    console.error('Usage: create-pr.ts --ticket FB-1');
    process.exit(1);
  }

  return {
    ticket: values.ticket,
    base: values.base || '',
    draft: values['no-draft'] ? false : (values.draft ?? true),
  };
}

function checkGitHubCLI(): boolean {
  try {
    execSync('gh --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const options = parseArguments();
  const ticketKey = options.ticket.toUpperCase();

  console.log(`\n🔀 Creating Pull Request for ${ticketKey}...\n`);

  // Check GitHub CLI
  if (!checkGitHubCLI()) {
    console.error('❌ GitHub CLI (gh) is not installed.');
    console.error('   Install with: brew install gh');
    console.error('   Then authenticate: gh auth login');
    process.exit(1);
  }

  // Get current branch
  const currentBranch = getCurrentBranch();
  console.log(`📌 Current branch: ${currentBranch}`);

  // Determine base branch
  const baseBranch = options.base || await getDefaultBranch();
  console.log(`🎯 Target branch: ${baseBranch}`);

  if (currentBranch === baseBranch) {
    console.error(`❌ You are on the ${baseBranch} branch. Switch to a feature branch first.`);
    process.exit(1);
  }

  // Load Jira config
  const config = JiraConfig.load();
  if (!config) {
    console.error('❌ Jira configuration not found.');
    process.exit(1);
  }

  const client = new JiraClient(config);

  // Fetch ticket details
  console.log('\n📥 Fetching ticket details...');
  const ticket = await client.getIssue(ticketKey);

  if (!ticket) {
    console.error(`❌ Ticket ${ticketKey} not found`);
    process.exit(1);
  }

  const summary = ticket.fields.summary;
  const description = ticket.fields.description || '';
  const ticketUrl = `${config.jiraUrl}/browse/${ticketKey}`;

  console.log(`   Summary: ${summary}`);

  // Check if PR already exists
  try {
    const existingPR = execSync(`gh pr list --head ${currentBranch} --json url --jq '.[0].url'`, {
      encoding: 'utf-8',
    }).trim();
    
    if (existingPR) {
      console.log(`\n⚠️  A PR already exists for this branch:`);
      console.log(`   ${existingPR}`);
      return;
    }
  } catch {
    // No existing PR, continue
  }

  // Push latest changes
  console.log('\n📤 Pushing latest changes...');
  try {
    execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
  } catch (e) {
    console.error('⚠️  Push failed. Please resolve any issues and try again.');
    process.exit(1);
  }

  // Build PR title and body
  const prTitle = `[${ticketKey}] ${summary}`;
  const prBody = `## Jira Ticket
🎫 [${ticketKey}](${ticketUrl})

## Summary
${summary}

## Description
${typeof description === 'string' ? description : 'See Jira ticket for details.'}

## Changes
<!-- Describe what this PR changes -->

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No regressions found

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated (if needed)
- [ ] No new warnings introduced
`;

  // Create PR
  console.log('\n🚀 Creating Pull Request...');
  
  const draftFlag = options.draft ? '--draft' : '';
  const escapedTitle = prTitle.replace(/"/g, '\\"');
  const escapedBody = prBody.replace(/"/g, '\\"').replace(/`/g, '\\`');

  try {
    const result = execSync(
      `gh pr create --title "${escapedTitle}" --body "${escapedBody}" --base ${baseBranch} ${draftFlag}`,
      { encoding: 'utf-8' }
    );
    
    console.log(`\n✅ Pull Request created successfully!`);
    console.log(`   ${result.trim()}`);
    
    // Add comment to Jira
    try {
      const prUrl = result.trim();
      await client.addComment(ticketKey, `Pull Request created: ${prUrl}`);
      console.log('   Added PR link to Jira ticket');
    } catch {
      // Ignore comment errors
    }

  } catch (error: any) {
    console.error('❌ Failed to create PR:', error.message);
    process.exit(1);
  }

  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review your PR on GitHub`);
  console.log(`   2. Request reviews from team members`);
  console.log(`   3. Merge when approved`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
