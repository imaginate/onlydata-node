/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var same = require('../../../help/vitals').same;

var isSpace = require('../../../help/is-whitespace');

var COMMA = ',';
var CLOSE = ']';

/**
 * @param {string} line
 * @param {number} i
 * @return {boolean}
 */
module.exports = function isListStringEnd(line, i) {

  /** @type {string} */
  var char;
  /** @type {number} */
  var len;

  len = line.length;
  while (++i < len) {

    char = line[i];

    if ( isSpace(char) ) continue;

    if ( same(char, COMMA) ) break;
    if ( same(char, CLOSE) ) break;

    return false;
  }

  return true;
};
