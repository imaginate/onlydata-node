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

var isEnd = require('./is-end-mark');

var isSpace = require('../../../help/is-whitespace');

/**
 * @param {string} line
 * @param {number} i
 * @return {boolean}
 */
module.exports = function isListStringEnd(line, i) {

  /** @type {string} */
  var item;
  /** @type {number} */
  var len;

  len = line.length;
  while (++i < len) {

    item = line[i];

    if ( isSpace(item) ) continue;

    if ( isEnd(item) ) break;

    return false;
  }

  return true;
};
