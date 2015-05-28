var fs = require('fs');
var path = require('path');
var through = require('through');
var flatten = require('whisk/flatten');
var reLineBreak = require('reu/newline');
var reHttp = /^http/;
var reScript = /\<script(.*?)\><\/script\>/i;
var rePreprocessedUrl = /\<c\:url(.*)\/\>/i;
var pluck = require('whisk/pluck');
var toAttributes = require('parse-attributes');

function extractJspUrl(result) {
  return rePreprocessedUrl.exec(result[1]) || result;
}

function isLocal(path) {
  return !reHttp.test(path);
}

module.exports = function(opts) {
  var remain = ((opts || {}).argv || {}).remain || [];

  function addBasePaths(file) {
    // if the file is absolute, then make relative
    file = (file[0] === '/') ? file.slice(1) : file;

    return (opts.path || []).map(function(basePath) {
      return path.resolve(basePath, file);
    });
  }

  function write(data) {
    var lines = data.toString().split(reLineBreak).map(function(line) {
      return reScript.exec(line);
    }).filter(Boolean);

    // extract c:url elements if they exist
    lines
      .map(extractJspUrl)
      .map(pluck(1))
      .map(toAttributes)
      .map(function(data) {
        return data.value || data.src;
      })
      .filter(isLocal)
      .map(addBasePaths)
      .reduce(flatten, [])
      .filter(fs.existsSync)
      .map(function(filename) {
        return filename + '\n';
      })
      .forEach(this.queue.bind(this));
  }

  return through(write, function() {});
};