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

var getBaseKey  = require('./base-key/get');
var trimBaseKey = require('./base-key/trim');

var isBlock   = require('./string/blocked/is');
var isBoolean = require('./boolean/is');
var isComment = require('./comment/is');
var isImport  = require('./import/is');
var isList    = require('./list/is');
var isMap     = require('./map/is');
var isNull    = require('./null/is');
var isNumber  = require('./number/is');
var isQuoted  = require('./string/quoted/is');

var parseBlock   = require('./string/blocked/parse');
var parseBoolean = require('./boolean/parse');
var parseImport  = require('./import/parse');
var parseList    = require('./list/parse');
var parseMap     = require('./map/parse');
var parseNumber  = require('./number/parse');
var parseQuoted  = require('./string/quoted/parse');
var parseString  = require('./string/parse');

var vitals = require('../help/vitals');
var fuse   = vitals.fuse;
var is     = vitals.is;
var to     = vitals.to;

var isBlank   = require('../help/is-empty-str');
var trimSpace = require('../help/trim-whitespace');

/**
 * @param {!Object} config
 * @param {string}  data - must be valid OnlyData syntax (line-feed EOLs only)
 * @param {string=} file
 * @return {!Object}
 */
module.exports = function parseOnlyData(config, data, file) {

  /** @type {!Object} */
  var result;
  /** @type {!Array} */
  var lines;
  /** @type {string} */
  var line;
  /** @type {string} */
  var key;
  /** @type {*} */
  var val;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  file = file || '';

  if ( !is.obj(config) ) throw new TypeError('invalid type for `config` param');
  if ( !is.str(data)   ) throw new TypeError('invalid type for `data` param');
  if ( !is.str(file)   ) throw new TypeError('invalid type for `file` param');

  if ( isBlank(data) ) return {};

  result = {};
  lines = to.arr(data, '\n');
  len = lines.length;
  i = -1;
  while (++i < len) {

    line = lines[i];
    line = trimSpace(line);

    if ( isComment(line) ) continue;

    key = getBaseKey(line, i, file);
    val = trimBaseKey(line);

    if ( isComment(val) ) throw new Error( noValErrMsg(i, file) );

    // parse lists, maps, and string blocks (i.e. multi-line values)
    val = isList(val)
      ? parseList(lines, i, file)
      : isMap(val)
        ? parseMap(lines, i, file)
        : isBlock(val)
          ? parseBlock(lines, i, file)
          : val;

    // save list, map, or string block result
    if ( is.obj(val) ) {
      i   = val.index;
      val = val.value;
    }
    else {
      // parse remaining data types
      val = isQuoted(val)
        ? parseQuoted(val, i, file)
        : isNull(val)
          ? null
          : isBoolean(val)
            ? parseBoolean(val)
            : isImport(val)
              ? parseImport(config, val, i, file)
              : isNumber(val)
                ? parseNumber(val)
                : parseString(val);
    }

    result[key] = val;
  }

  return result;
};

/**
 * @private
 * @param {number} i
 * @param {string} file
 * @return {string}
 */
function noValErrMsg(i, file) {
  ++i;
  return file
    ? fuse('missing a value at line `', i, '` in file `', file, '`')
    : fuse('missing a value at line `', i, '`');
}
