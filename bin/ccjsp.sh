#!/usr/bin/env node
var nopt = require('nopt');
var path = require('path');
var knownOpts = {
  path: [path, Array]
};

process.stdin.pipe(require('..')(nopt(knownOpts, {}, process.argv, 2)));