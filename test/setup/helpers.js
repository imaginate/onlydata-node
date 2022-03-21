/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @see [OnlyData](https://github.com/imaginate/onlydata)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

var fs = require('fs');
global.mkdir = fs.mkdirSync;
global.mv    = fs.renameSync;
global.rm    = fs.unlinkSync;
global.rmdir = fs.rmdirSync;

global.resolve = require('path').resolve;
global.assert  = require('assert');

var base = resolve(__dirname, '../../');
var path = resolve(base, 'dist/onlydata.js');
global.onlydata = require(path);

global.log = require('log-ocd')();

require('node-vitals')('base', 'fs').mkGlobal();

log.error.setConfig({
  'logger': logError,
  'throw':  false,
  'exit':   false
});

log.error.setFormat({
  'linesAfter': 2
});

log.fail.setFormat({
  'linesAfter': 0,
  'header': {
    'spaceBefore': 0,
    'spaceAfter':  0,
    'accentMark': ''
  }
});

log.fail.setStyle({
  'header': {
    'color': 'red',
    'bg':    ''
  }
});

/**
 * @param {string} result
 */
function logError(result) {
  result = remap(result, /\n/g, '\n    ');
  result = fuse('  ', result);
  console.log(result);
}
