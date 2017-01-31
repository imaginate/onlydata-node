/**
 * -----------------------------------------------------------------------------
 * ACT TASK: test
 * -----------------------------------------------------------------------------
 * @file Use `$ act test` to access this file.
 * @version 1.0.4
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////

exports['desc'] = 'run all unit tests';
exports['method'] = test;

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

var path = require('path');
var resolve = path.resolve;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

// `onlydata-node/test/` absolute path
var TEST = resolve(__dirname, '../test/');

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @type {function}
 */
function test() {

  /** @type {string} */
  var path;

  path = resolve(TEST, 'init.js');
  require(path);
}
