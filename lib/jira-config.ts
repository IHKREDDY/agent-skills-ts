/**
 * Jira Configuration Manager
 * 
 * Reads credentials from multiple sources (in priority order):
 * 1. Environment variables (JIRA_URL, JIRA_EMAIL, JIRA_API_TOKEN)
 * 2. .env file in project root
 * 3. VS Code workspace settings (via .vscode/settings.json) - URL/email only
 * 
 * Security: Never commit credentials to git. Use .env files (gitignored)
 * or environment variables. API tokens should ONLY be in .env or env vars.
 */

import { config } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export interface JiraConfig {
  url: string;
  email: string;
  token: string;
  defaultProject: string;
}

/**
 * Load configuration from .env file
 * Searches in current directory and parent directories
 */
function loadEnvFile(): Partial<JiraConfig> {
  const cwd = process.cwd();
  
  // Search for .env in current directory and parent directories
  const searchPaths = [
    resolve(cwd, '.env'),
    resolve(cwd, '..', '.env'),
    resolve(cwd, '..', '..', '.env'),
    resolve(cwd, '..', '..', '..', '.env'),
  ];
  
  for (const envPath of searchPaths) {
    if (existsSync(envPath)) {
      config({ path: envPath });
      break;
    }
  }
  
  return {
    url: process.env.JIRA_URL,
    email: process.env.JIRA_EMAIL,
    token: process.env.JIRA_API_TOKEN,
    defaultProject: process.env.JIRA_DEFAULT_PROJECT,
  };
}

/**
 * Load configuration from VS Code workspace settings
 * Note: Only loads URL, email, and project - NOT the token (for security)
 */
function loadVSCodeSettings(): Partial<JiraConfig> {
  const settingsPath = resolve(process.cwd(), '.vscode', 'settings.json');
  
  if (!existsSync(settingsPath)) {
    return {};
  }
  
  try {
    const content = readFileSync(settingsPath, 'utf-8');
    // Remove comments (VS Code settings can have comments)
    const jsonContent = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const settings = JSON.parse(jsonContent);
    
    // Look for jira settings under "agentSkills.jira" namespace
    const jiraSettings = settings['agentSkills.jira'] || {};
    
    return {
      url: jiraSettings.url,
      email: jiraSettings.email,
      // Token should NOT be in settings.json - only in .env
      defaultProject: jiraSettings.defaultProject,
    };
  } catch {
    return {};
  }
}

/**
 * Get Jira configuration from all available sources
 */
export function getJiraConfig(): JiraConfig {
  // Load from all sources
  const envConfig = loadEnvFile();
  const vscodeConfig = loadVSCodeSettings();
  
  // Priority: Environment/dotenv > VS Code settings
  const url = envConfig.url || vscodeConfig.url;
  const email = envConfig.email || vscodeConfig.email;
  const token = envConfig.token; // Token only from env (secure)
  const defaultProject = envConfig.defaultProject || vscodeConfig.defaultProject || 'SAM1';

  if (!url || !email || !token) {
    console.error('');
    console.error('❌ Missing Jira configuration');
    console.error('');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('');
    console.error('📋 Quick Setup (recommended):');
    console.error('');
    console.error('   1. Copy the template:');
    console.error('      cp .github/skills/.env.example .env');
    console.error('');
    console.error('   2. Edit .env with your credentials:');
    console.error('      JIRA_URL=https://ihkreddy.atlassian.net');
    console.error('      JIRA_EMAIL=your-email@example.com');
    console.error('      JIRA_API_TOKEN=your-api-token');
    console.error('');
    console.error('   3. Get your API token from:');
    console.error('      https://id.atlassian.com/manage-profile/security/api-tokens');
    console.error('');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('');
    
    if (!url) console.error('   ❌ Missing: JIRA_URL');
    if (!email) console.error('   ❌ Missing: JIRA_EMAIL');
    if (!token) console.error('   ❌ Missing: JIRA_API_TOKEN');
    console.error('');
    
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
