#!/usr/bin/env node
/**
 * Interactive Setup Script for Agent Skills
 * Helps developers configure Jira credentials securely
 */

import { createInterface } from 'readline';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function maskToken(token: string): string {
  if (token.length <= 8) return '*'.repeat(token.length);
  return token.substring(0, 4) + '*'.repeat(token.length - 8) + token.substring(token.length - 4);
}

async function main() {
  console.log('');
  console.log('🔧 Agent Skills - Jira Configuration Setup');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('This will create a .env file with your Jira credentials.');
  console.log('The file is gitignored and will not be committed.');
  console.log('');

  const envPath = resolve(process.cwd(), '.env');
  
  // Check if .env already exists
  if (existsSync(envPath)) {
    const overwrite = await question('⚠️  .env already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Cancelled.');
      rl.close();
      return;
    }
  }

  console.log('');
  console.log('📋 Get your Jira API token from:');
  console.log('   https://id.atlassian.com/manage-profile/security/api-tokens');
  console.log('');

  // Collect configuration
  const url = await question('Jira URL (e.g., https://yourcompany.atlassian.net): ');
  const email = await question('Jira Email: ');
  const token = await question('Jira API Token: ');
  const project = await question('Default Project Key (e.g., SAM1) [SAM1]: ') || 'SAM1';

  // Validate
  if (!url.startsWith('https://')) {
    console.error('❌ URL must start with https://');
    rl.close();
    process.exit(1);
  }

  if (!email.includes('@')) {
    console.error('❌ Please enter a valid email');
    rl.close();
    process.exit(1);
  }

  if (token.length < 10) {
    console.error('❌ API token seems too short');
    rl.close();
    process.exit(1);
  }

  // Create .env content
  const envContent = `# Jira Configuration for Agent Skills
# Generated on ${new Date().toISOString()}
# 
# ⚠️  SECURITY: This file contains secrets. Never commit to git.
#     It should already be in .gitignore.

JIRA_URL=${url}
JIRA_EMAIL=${email}
JIRA_API_TOKEN=${token}
JIRA_DEFAULT_PROJECT=${project}
`;

  writeFileSync(envPath, envContent);

  console.log('');
  console.log('✅ Configuration saved to .env');
  console.log('');
  console.log('   URL:     ' + url);
  console.log('   Email:   ' + email);
  console.log('   Token:   ' + maskToken(token));
  console.log('   Project: ' + project);
  console.log('');
  console.log('🎉 Setup complete! You can now use the skills:');
  console.log('');
  console.log('   npm run create-ticket -- -s "My first ticket"');
  console.log('');

  rl.close();
}

main().catch(console.error);
