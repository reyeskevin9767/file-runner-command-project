#!/usr/bin/env node
//* ^--Code run in Node
// Developer Note for new commands: npm link -> run filename
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');
const chalk = require('chalk');

//* Framework for command line applications and auto-generated help
program
  .version('0.0.1')
  .argument('<filename>', 'filename')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    // Wait for 100ms after chokidar finishes event to run start
    let proc;
    const start = debounce(() => {
      try {
        if (proc) {
          proc.kill();
        }
      } catch (err) {
        throw new Error(`Error in file running`);
      }

      // Child Process starts a second program
      console.log(chalk.red('>>>>>>> Starting Process....'));
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 200);

    // chokidar watches current directory for changes with events
    chokidar
      .watch('.', { ignored: /\.git.|node_modules/ })
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);
