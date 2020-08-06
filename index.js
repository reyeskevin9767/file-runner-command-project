#!/usr/bin/env node
//* ^--Code run in Node
// Developer Note for new commands: npm link -> run filename

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');

//* Wait for 100ms after chokidar finishes event
const start = debounce(() => {
  console.log('STARTING USERS PROGRAM');
}, 100);

//* chokidar watches current directory for changes with events
chokidar
  .watch('.')
  .on('add', () => start)
  .on('change', () => console.log('File Changed'))
  .on('unlink', () => console.log('File Unlinked'));
