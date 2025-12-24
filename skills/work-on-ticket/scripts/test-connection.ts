#!/usr/bin/env npx ts-node --esm
/**
 * Test Jira Connection
 */

import { getJiraConfig, validateConfig } from '../../../lib/jira-config.js';
import { JiraClient } from '../../../lib/jira-client.js';

async function main() {
  console.log('🔌 Testing Jira connection...');
  console.log('');

  const config = getJiraConfig();
  if (!validateConfig(config)) {
    process.exit(1);
  }

  console.log(`   URL: ${config.url}`);
  console.log(`   Email: ${config.email}`);
  console.log(`   Token: ${'*'.repeat(20)}`);
  console.log('');

  const client = new JiraClient(config);

  try {
    const connected = await client.testConnection();
    
    if (connected) {
      const user = await client.getCurrentUser();
      console.log('✅ Connection successful!');
      console.log(`   Logged in as: ${user.displayName} (${user.emailAddress})`);
    } else {
      console.error('❌ Connection failed');
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Connection failed: ${error}`);
    process.exit(1);
  }
}

main();
