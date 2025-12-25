#!/usr/bin/env node
/**
 * Full workflow: Create branch from Jira ticket, then optionally create PR
 * Usage: node --loader ts-node/esm .github/skills/skills/branch-and-pr/scripts/full-workflow.ts --ticket FB-1
 */

import { execSync, spawnSync } from 'child_process';
import { parseArgs } from 'util';
import * as readline from 'readline';

interface Options {
  ticket: string;
  autopr: boolean;
}

function parseArguments(): Options {
  const { values } = parseArgs({
    options: {
      ticket: { type: 'string', short: 't' },
      'auto-pr': { type: 'boolean', default: false },
    },
    strict: true,
  });

  if (!values.ticket) {
    console.error('❌ Error: --ticket is required');
    console.error('Usage: full-workflow.ts --ticket FB-1');
    process.exit(1);
  }

  return {
    ticket: values.ticket,
    autopr: values['auto-pr'] ?? false,
  };
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  const options = parseArguments();
  const ticketKey = options.ticket.toUpperCase();
  const scriptsDir = '.github/skills/skills/branch-and-pr/scripts';

  console.log(`\n🚀 Full Workflow for ${ticketKey}\n`);
  console.log('═'.repeat(50));

  // Step 1: Create branch
  console.log('\n📍 Step 1: Creating branch...\n');
  
  const branchResult = spawnSync('node', [
    '--loader', 'ts-node/esm',
    `${scriptsDir}/create-branch.ts`,
    '--ticket', ticketKey,
  ], { 
    stdio: 'inherit',
    shell: true,
  });

  if (branchResult.status !== 0) {
    console.error('\n❌ Branch creation failed');
    process.exit(1);
  }

  console.log('\n═'.repeat(50));
  console.log('\n📍 Step 2: Development Phase\n');
  console.log('   You can now:');
  console.log('   • Make your code changes');
  console.log('   • Run tests');
  console.log('   • Commit your work');
  console.log('');

  // If auto-pr flag, create PR immediately
  if (options.autopr) {
    console.log('\n═'.repeat(50));
    console.log('\n📍 Step 3: Creating Pull Request...\n');
    
    const prResult = spawnSync('node', [
      '--loader', 'ts-node/esm',
      `${scriptsDir}/create-pr.ts`,
      '--ticket', ticketKey,
    ], { 
      stdio: 'inherit',
      shell: true,
    });

    if (prResult.status !== 0) {
      console.error('\n❌ PR creation failed');
      process.exit(1);
    }
  } else {
    console.log('   When ready to create a PR, run:');
    console.log(`   node --loader ts-node/esm ${scriptsDir}/create-pr.ts --ticket ${ticketKey}`);
  }

  console.log('\n═'.repeat(50));
  console.log('\n✅ Workflow setup complete!\n');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
