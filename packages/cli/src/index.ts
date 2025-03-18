#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('invvarch')
  .description('CLI for managing INVVARCH projects')
  .version('0.1.0');

// Command: init
program
  .command('init')
  .description('Initialize a new INVVARCH project')
  .option('-n, --name <name>', 'Project name')
  .action((options) => {
    const name = options.name || 'default-invvarch-project';
    console.log(chalk.green(`Initializing project: ${name}`));
    // Add project initialization logic here
  });

// Command: build
program
  .command('build')
  .description('Build the project')
  .action(() => {
    console.log(chalk.blue('Building the project...'));
    // Add build logic here
  });

// Command: serve
program
  .command('serve')
  .description('Serve the project locally')
  .option('-p, --port <port>', 'Specify the port', '3000')
  .action((options) => {
    console.log(chalk.yellow(`Serving project on port ${options.port}`));
    // Add server logic here
  });

// Parse arguments
program.parse(process.argv);
