#!/usr/bin/env npx ts-node --esm
/**
 * Fetch Jira Ticket Details
 */

import { Command } from 'commander';
import { getJiraConfig, validateConfig } from '../../../lib/jira-config.js';
import { JiraClient, JiraIssue } from '../../../lib/jira-client.js';

const program = new Command();

program
  .name('fetch-ticket')
  .description('Fetch Jira ticket details')
  .requiredOption('--ticket <ticketId>', 'Jira ticket ID (e.g., SAM1-123)')
  .option('--json', 'Output as JSON')
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

function formatTicket(issue: JiraIssue, config: { url: string }): string {
  const lines: string[] = [];
  
  lines.push(`# [${issue.key}] ${issue.fields.summary}`);
  lines.push('');
  lines.push(`**URL:** ${config.url}/browse/${issue.key}`);
  lines.push(`**Type:** ${issue.fields.issuetype.name}`);
  lines.push(`**Status:** ${issue.fields.status.name}`);
  if (issue.fields.priority) {
    lines.push(`**Priority:** ${issue.fields.priority.name}`);
  }
  if (issue.fields.assignee) {
    lines.push(`**Assignee:** ${issue.fields.assignee.displayName}`);
  }
  if (issue.fields.labels.length > 0) {
    lines.push(`**Labels:** ${issue.fields.labels.join(', ')}`);
  }
  lines.push('');
  
  if (issue.fields.description) {
    lines.push('## Description');
    lines.push('');
    lines.push(extractTextFromAdf(issue.fields.description));
    lines.push('');
  }
  
  return lines.join('\n');
}

async function main() {
  const config = getJiraConfig();
  if (!validateConfig(config)) {
    process.exit(1);
  }

  console.log(`📋 Fetching ticket ${options.ticket}...`);

  const client = new JiraClient(config);

  try {
    const issue = await client.getIssue(options.ticket);

    if (options.json) {
      console.log(JSON.stringify(issue, null, 2));
    } else {
      console.log('');
      console.log(formatTicket(issue, config));
    }
  } catch (error) {
    console.error(`❌ Failed to fetch ticket: ${error}`);
    process.exit(1);
  }
}

main();
