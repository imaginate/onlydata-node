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

var isBoolean = require('../../boolean/is');
var isEndMark = require('./is-end-mark');
var isNull    = require('../../null/is');
var isNumber  = require('../../number/is');
var isQuote   = require('./is-quote-mark');
var isStrEnd  = require('./is-string-end');

var parseBoolean = require('../../boolean/parse');
var parseNumber  = require('../../number/parse');

var vitals = require('../../../help/vitals');
var fuse   = vitals.fuse;
var is     = vitals.is;
var same   = vitals.same;

var isSpace = require('../../../help/is-whitespace');

var COMMA = ',';
var END   = ']';
var HASH  = '#';

/**
 * @param {string} LINE
 * @param {number} ROW
 * @param {string} FILE
 * @return {!{
 *   index: number,
 *   value: !Array
 * }}
 */
module.exports = function parseOnlyDataInlineList(LINE, ROW, FILE) {

  /** @type {!Array} */
  var ARR;
  /** @type {number} */
  var LEN;

  ARR = []; // note: array values are not constant
  LEN = LINE.length;

  /** @type {string} */
  var item;
  /** @type {number} */
  var i;
  /** @type {boolean} */
  var v;

  i = 0;
  while (++i < LEN) {

    item = LINE[i];

    if ( isSpace(item) ) continue;

    if ( same(item, COMMA) ) {
      if (!v) throw new Error( missingErrMsg(ROW, FILE) );
      v = false;
      continue;
    }

    if ( same(item, END) ) {
      parseEnd(i);
      break;
    }

    i = isQuote(item)
      ? parseString(item, i)
      : parseValue(item, i);
    v = true;
  }

  return {
    'index': ROW
    'value': ARR
  };

  /**
   * @private
   * @param {string} item
   * @param {number} i
   * @return {number}
   */
  function parseString(item, i) {

    /** @type {string} */
    var quote;
    /** @type {string} */
    var str;

    // save the quote mark
    quote = item;

    // build the string
    str = '';
    while (++i) {
      if (i >= LEN) throw new Error( invalidErrMsg(ROW, FILE) );
      item = LINE[i];
      if ( same(item, quote) && isStrEnd(LINE, i) ) break;
      str = fuse.str(str, item);
    }

    // save the string
    ARR = fuse.value(ARR, str);

    // progress the index past the last quote mark
    ++i;

    // progress the index past any whitespace
    while ( isSpace(LINE[i]) ) ++i;

    return i;
  }

  /**
   * @private
   * @param {string} item
   * @param {number} i
   * @return {number}
   */
  function parseValue(item, i) {

    /** @type {string} */
    var str;
    /** @type {*} */
    var val;

    // build the value string
    str = item;
    while (++i) {
      if (i >= LEN) throw new Error( invalidErrMsg(ROW, FILE) );

      item = LINE[i];

      // progress the index past any whitespace and end
      if ( isSpace(item) ) {
        ++i;
        while ( isSpace(LINE[i]) ) ++i;
        if ( !isEndMark(LINE[i]) ) throw new Error( invalidErrMsg(ROW, FILE) );
        break;
      }

      // step the index back and end
      if ( isEndMark(item) ) {
        --i;
        break;
      }

      str = fuse.str(str, item);
    }

    // parse the value
    val = isNull(str)
      ? null
      : isBoolean(str)
        ? parseBoolean(str)
        : isNumber(str)
          ? parseNumber(str)
          : undefined;

    if ( is.undefined(val) ) throw new Error( invalidErrMsg(ROW, FILE) );

    // save the value
    ARR = fuse.value(ARR, val);

    return i;
  }

  /**
   * @private
   * @param {number} i
   */
  function parseEnd(i) {

    /** @type {string} */
    var item;

    // ensure valid syntax after array end
    while (++i < LEN) {

      item = LINE[i];

      if ( isSpace(item) ) continue;

      if ( same(item, HASH) ) break;

      throw new Error( invalidErrMsg(ROW, FILE) );
    }
  }
};

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
