# rig-html

This is a simple tool that can read HTML (or JSP) input from `stdin` and find all the `<script></script>` tags coming in.  It will then identify any files that are referenced in the script tag and attempt to reconcile that against the local filesystem (using `--path` options).

[![NPM](https://nodei.co/npm/rig-html.png)](https://nodei.co/npm/rig-html/)

## Example Usage

The following example contatenates `a.html` and `b.html` through to `rig-html` and resolve files referenced against a couple of paths. 

```
cat a.html b.html | rig-html --path scripts/ --path vendor/lib/
```

This would then generate a list of scripts (with absolute path) that have been found as existing in the two HTML docs, e.g:

```
/full/path/to/project/vendor/lib/jquery.js
/full/path/to/project/scripts/app.js
```

This may not seems terribly useful on it's own, but when you combine it with `xargs` it becomes quite magical:

```
cat a.html b.html | rig-html --path scripts/ --path vendor/lib/ | xargs cat
```

Which would then generate the entire output of the contatenated files :)

## Why?

It should be noted that this tool only exists to make it easier to work with "old school" HTML page development flow.  It's probably not recommended for a new project, as you should definitely consider something like [browserify](https://github.com/substack/node-browserify) or [webpack](https://github.com/webpack/webpack/).

## License(s)

### MIT

Copyright (c) 2015 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

