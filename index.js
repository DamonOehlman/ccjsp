var through = require('through');
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
  function write(data) {
    var lines = data.toString().split(reLineBreak).map(function(line) {
      return reScript.exec(line);
    }).filter(Boolean);

    // extract c:url elements if they exist
    lines = lines
      .map(extractJspUrl)
      .map(pluck(1))
      .map(toAttributes)
      .map(function(data) {
        return data.value || data.src;
      })
      .filter(isLocal);

    console.log(lines);
  }

  function end() {
  }

  return through(write, end);
};