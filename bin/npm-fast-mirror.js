#!/usr/bin/env node

const { join } = require('path');
const { homedir } = require('os');
const program = require('commander');

const pkg = require('../package.json');

const server = require('../lib/server');

program
  .version(pkg.version)
  .option('-u, --url [url]', 'url to serve this server', 'http://127.0.0.1:9000')
  .option('-p, --proxy [url]', 'npm registry url to proxy', 'https://registry.npmjs.com')
  .option('-d, --dir [path]', 'storage dir path', join(homedir(), '.npm-fast-mirror'))
  .parse(process.argv);

program.proxy = program.proxy.replace(/\/$/, '');
program.url = program.url.replace(/\/$/, '');
program.dir = program.dir.replace(/\/$/, '');

server(program);
