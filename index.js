#!/usr/bin/env node
//* ^--Code run in Node
// Developer Note for new commands: npm link -> run filename

const chokidar = require('chokidar');

//* Watch current directory for changes
chokidar
  .watch('.')
  .on('add', () => console.log('File Added'))
  .on('change', () => console.log('File Changed'))
  .on('unlink', () => console.log('File Unlinked'));
