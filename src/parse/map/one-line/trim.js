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

var trimQuoted = require('../../string/quoted/trim');

var vitals = require('../../../help/vitals');
var same   = vitals.same;
var slice  = vitals.slice;

var isQuote = require('../../../help/is-quote-mark');

var OPEN  = '{';
var CLOSE = '}';

/**
 * @param {string} line
 * @return {string}
 */
module.exports = function trimInlineMap(line) {

  /** @type {string} */
  var item;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  item = line[0];

  if ( !same(item, OPEN) ) return line;

  len = line.length;
  i = 0;
  while (++i < len) {

    item = line[i];

    if ( isQuote(item) ) {
      line = slice(line, i);
      line = trimQuoted(line);
      len = line.length;
      i = -1;
      continue;
    }

    if ( same(item, CLOSE) ) break;
  }

  return slice(line, i);
};
