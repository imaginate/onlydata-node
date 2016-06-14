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

var vitals = require('../../../help/vitals');
var same   = vitals.same;
var slice  = vitals.slice;

var isQuote = require('../../../help/is-quote-mark');

var BACK = '\\';

/**
 * @param {string} line
 * @return {string}
 */
module.exports = function trimQuotedString(line) {

  /** @type {string} */
  var quote;
  /** @type {string} */
  var item;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  quote = line[0];

  if ( !isQuote(quote) ) return line;

  len = line.length;
  i = 0;
  while (++i < len) {

    item = line[i];

    if ( same(item, quote) ) {
      ++i;
      break;
    }

    // skip escaped quotes
    if ( same(item, BACK) && same(line[i + 1], quote) ) ++i;
  }

  return slice(line, i);
};
