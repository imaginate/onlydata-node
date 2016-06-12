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

var isSpace = require('../../../help/is-whitespace');

/**
 * @param {string} line
 * @param {number} i
 * @return {number}
 */
module.exports = function trimListStringEnd(line, i) {
  while (++i) {
    if ( !isSpace(line[i]) ) break;
  }
  return i;
};
