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

var trimStrEnd = require('./trim-string-end');
var trimValEnd = require('./trim-value-end');

var isBoolean   = require('../../boolean/is');
var isComment   = require('../../comment/is');
var isNull      = require('../../null/is');
var isNumber    = require('../../number/is');
var isQuote     = require('../../string/quoted/is');
var isStrEnd    = require('./is-string-end');
var isValidEnd  = require('./is-valid-end');

var parseBoolean = require('../../boolean/parse');
var parseNumber  = require('../../number/parse');

var vitals = require('../../../help/vitals');
var fuse   = vitals.fuse;
var is     = vitals.is;
var same   = vitals.same;

var isSpace = require('../../../help/is-whitespace');

var COMMA = ',';
var CLOSE = ']';

/**
 * @param {string} line
 * @param {number} index
 * @param {string} file
 * @return {!{
 *   index: number,
 *   value: !Array
 * }}
 */
module.exports = function parseOnlyDataInlineList(line, index, file) {

  /** @type {string} */
  var char;
  /** @type {!Array} */
  var arr;
  /** @type {*} */
  var val;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;
  /** @type {string} */
  var q;

  arr = [];
  len = line.length;
  i = 0;
  while (++i < len) {

    char = line[i];

    // handle quoted string
    if (q) {
      if ( same(char, q) && isStrEnd(line, i) ) {
        arr = fuse.value(arr, val);
        val = undefined;
        i = trimStrEnd(line, i);
        q = '';
      }
      else val = fuse.str(val, char);
      continue;
    }

    if ( isComment(char) ) throw new Error( invalidErrMsg(index, file) );

    // handle list end
    if ( same(char, CLOSE) ) {
      if ( !isValidEnd(line, i) ) throw new Error( invalidErrMsg(index, file) );
      if ( !is.undefined(val) ) {
        arr = addValue(arr, val, index, file);
        val = undefined;
      }
      break;
    }

    if ( isSpace(char) ) {

      // handle value end
      if ( !is.undefined(val) ) {
        i = trimValEnd(line, i);
        if (!i) throw new Error( invalidErrMsg(index, file) );
        arr = addValue(arr, val, index, file);
        val = undefined;
      }

      continue;
    }

    // handle value end
    if ( same(char, COMMA) ) {
      arr = addValue(arr, val, index, file);
      val = undefined;
      continue;
    }

    // handle string start
    if ( isQuote(char) ) {
      val = '';
      q = char;
      continue;
    }

    val = fuse.str(val || '', char);
  }

  if ( !is.undefined(val) ) throw new Error( invalidErrMsg(index, file) );

  return {
    'index': index
    'value': arr
  };
};

/**
 * @private
 * @param {!Array} arr
 * @param {string} val
 * @param {number} i
 * @param {string} file
 * @return {!Array}
 */
function addValue(arr, val, i, file) {

  if ( is.undefined(val) ) throw new Error( missingErrMsg(i, file) );

  val = isNull(val)
    ? null
    : isBoolean(val)
      ? parseBoolean(val)
      : isNumber(val)
        ? parseNumber(val)
        : undefined;

  if ( is.undefined(val) ) throw new Error( invalidErrMsg(i, file) );

  return fuse.value(arr, val);
}

/**
 * @private
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
function invalidErrMsg(i, file) {
  ++i;
  return file
    ? fuse('invalid list at line `', i, '` in file `', file, '`')
    : fuse('invalid list at line `', i, '`');
}

/**
 * @private
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
function missingErrMsg(i, file) {
  ++i;
  return file
    ? fuse('missing a list value at line `', i, '` in file `', file, '`')
    : fuse('missing a list value at line `', i, '`');
}
