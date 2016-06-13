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

var parseBoolean = require('../../boolean/parse');
var parseNumber  = require('../../number/parse');

var vitals = require('../../../help/vitals');
var fuse   = vitals.fuse;
var is     = vitals.is;
var same   = vitals.same;

var isSpace = require('../../../help/is-whitespace');

var BACK  = '\\';
var COMMA = ',';
var CLOSE = ']';
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
  /** @type {string} */
  var end;
  /** @type {number} */
  var i;
  /** @type {boolean} */
  var v;

  i = 0;
  while (++i) {
    if (i >= LEN) throw new Error( invalidErrMsg(ROW, FILE) );

    // trim leading whitespace
    i = skipSpace(i);

    item = LINE[i];

    // error: empty value
    if ( same(item, COMMA) ) throw new Error( missingErrMsg(ROW, FILE) );

    // close array and verify ending syntax
    if ( same(item, CLOSE) ) {
      parseEnd(i);
      break;
    }

    // parse value and progress index
    i = isQuote(item)
      ? parseString(item, i)
      : parseValue(item, i);

    // trim following whitespace
    i = skipSpace(i);

    end = LINE[i];

    // close array and verify ending syntax
    if ( same(end, CLOSE) ) {
      parseEnd(i);
      break;
    }

    // error: value was not separated by a comma
    if ( !same(end, COMMA) ) throw new Error( invalidErrMsg(ROW, FILE) );
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

      if ( same(item, quote) ) break;

      // keep escaped quotes
      if ( same(item, BACK) && same(LINE[i + 1], quote) ) {
        ++i;
        item = LINE[i];
      }

      str = fuse.str(str, item);
    }

    // save the string
    ARR = fuse.value(ARR, str);

    // progress the index past the last quote mark
    ++i;

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

      if ( isSpace(item) || isEndMark(item) ) break;

      str = fuse.str(str, item);
    }

    // parse the value
    if (      isNull(str)    ) val = null;
    else if ( isBoolean(str) ) val = parseBoolean(str);
    else if ( isNumber(str)  ) val = parseNumber(str);
    else throw new Error( invalidErrMsg(ROW, FILE) );

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

  /**
   * @private
   * @param {number} i
   * @return {number}
   */
  function skipSpace(i) {
    while ( isSpace(LINE[i]) ) ++i;
    return i;
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
