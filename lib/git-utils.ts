/**
 * Git utilities for branch and PR management
 */

import { execSync, exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function sanitizeBranchName(summary: string): string {
  return summary
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

export function getBranchPrefix(issueType: string): string {
  const prefixes: Record<string, string> = {
    bug: 'bugfix',
    hotfix: 'hotfix',
    epic: 'epic',
  };
  return prefixes[issueType.toLowerCase()] || 'feature';
}

export function createBranch(ticketKey: string, summary: string, issueType: string): string {
  const prefix = getBranchPrefix(issueType);
  const safeName = sanitizeBranchName(summary);
  const branchName = `${prefix}/${ticketKey.toLowerCase()}-${safeName}`;

  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
  return branchName;
}

export function pushBranch(branchName: string): void {
  execSync(`git push -u origin ${branchName}`, { stdio: 'inherit' });
}

export async function getDefaultBranch(): Promise<string> {
  try {
    const { stdout } = await execAsync('git symbolic-ref refs/remotes/origin/HEAD');
    return stdout.trim().replace('refs/remotes/origin/', '');
  } catch {
    return 'main';
  }
}

export async function createPullRequest(
  branchName: string,
  ticketKey: string,
  summary: string,
  ticketUrl: string,
  description?: string
): Promise<string | null> {
  const title = `[${ticketKey}] ${summary}`;
  const body = `## Jira Ticket
${ticketUrl}

## Description
${description || `Implementing changes for ${ticketKey}`}

## Changes
- [ ] Implementation complete
- [ ] Tests added
- [ ] Documentation updated

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] No new warnings introduced
`;

  const defaultBranch = await getDefaultBranch();

  try {
    const { stdout } = await execAsync(
      `gh pr create --title "${title.replace(/"/g, '\\"')}" --body "${body.replace(/"/g, '\\"')}" --base ${defaultBranch} --draft`
    );
    return stdout.trim();
  } catch (error) {
    console.error('⚠️  PR creation failed. Install GitHub CLI: brew install gh');
    return null;
  }
}

export function getCurrentBranch(): string {
  return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
}

export function hasUncommittedChanges(): boolean {
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  return status.trim().length > 0;
}
