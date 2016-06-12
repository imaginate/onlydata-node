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

var isMulti = require('./multi-line/is');

var parseMulti = require('./multi-line/parse');
var parseLine  = require('./one-line/parse');

/**
 * @param {!Array<string>} lines
 * @param {number} i
 * @param {string} file
 * @return {!{
 *   index: number,
 *   value: !Array
 * }}
 */
module.exports = function parseOnlyDataList(lines, i, file) {

  /** @type {string} */
  var line;

  line = lines[i];
  return isMulti(line)
    ? parseMulti(lines, i, file)
    : parseLine(line, i, file);
};
