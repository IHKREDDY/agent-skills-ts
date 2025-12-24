/**
 * Jira Configuration Manager
 * Reads credentials from .env file or environment variables
 */

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env from project root
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  config({ path: envPath });
}

export interface JiraConfig {
  url: string;
  email: string;
  token: string;
  defaultProject: string;
}

export function getJiraConfig(): JiraConfig {
  const url = process.env.JIRA_URL;
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const defaultProject = process.env.JIRA_DEFAULT_PROJECT || 'SAM1';

  if (!url || !email || !token) {
    console.error('❌ Missing Jira configuration');
    console.error('');
    console.error('Set up credentials in .env file:');
    console.error('  JIRA_URL=https://your-domain.atlassian.net');
    console.error('  JIRA_EMAIL=your-email@example.com');
    console.error('  JIRA_API_TOKEN=your-api-token');
    console.error('');
    console.error('Or set environment variables.');
    process.exit(1);
  }

  return { url, email, token, defaultProject };
}

export function validateConfig(config: JiraConfig): boolean {
  if (!config.url.startsWith('https://')) {
    console.error('❌ JIRA_URL must start with https://');
    return false;
  }
  if (!config.email.includes('@')) {
    console.error('❌ JIRA_EMAIL must be a valid email');
    return false;
  }
  if (config.token.length < 10) {
    console.error('❌ JIRA_API_TOKEN seems too short');
    return false;
  }
  return true;
}
