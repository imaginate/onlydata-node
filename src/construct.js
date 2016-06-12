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

var make  = require('./make');
var parse = require('./parse');

var CONF_TYPE = require('./config/types');
var CONF_VALS = require('./config/values');

var vitals = require('./help/vitals');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var is     = vitals.is;

var hasODExt  = require('./help/has-onlydata-ext');
var normalize = require('./help/normalize-eol');

/**
 * @return {Function<string, function>}
 */
function newOnlyData() {

  /** @type {!Object} */
  var config;

  config = fuse({}, CONF_VALS);

  /**
   * The base method acts as `onlydata.make` and `onlydata.parse` simultaneously.
   *
   * @param {(!Object|string)} content - details per `content` data type:
   *   - object: `onlydata.make` is ran
   *   - string: `onlydata.parse` is ran
   * @param {string=} file - only valid if `content` is an object
   * @return {(!Object|string)}
   */
  var od = function onlydata(content, file) {

    if ( is.obj(content) ) return od.make(content, file);
    if ( is.str(content) ) return od.parse(content);

    if (!arguments.length) throw new Error('a `content` param must be given');
    else throw new TypeError('invalid type for `content` param');
  };

  /**
   * Parses an OnlyData string or file into an object.
   *
   * @param {string} str - a string of OnlyData or a valid OnlyData file path
   * @return {!Object}
   */
  od.parse = function parseOnlyData(str) {

    /** @type {string} */
    var file;

    if ( !arguments.length ) throw new Error('a `str` param must be given');
    if ( !is.str(str) ) throw new TypeError('invalid type for `str` param');

    if ( is.file(str) ) {
      if ( !hasODExt(str) ) throw new Error('invalid file extension for `str` param');
      file = str;
      str = get.file(file, {
        'buffer':   false,
        'encoding': 'utf8',
        'eol':      'LF'
      });
    }
    else str = normalize(str);

    return parse(config, str, file);
  };

  /**
   * Parses an OnlyData string into an object.
   *
   * @param {string} str - a string of OnlyData
   * @return {!Object}
   */
  od.parseString = function parseOnlyDataString(str) {

    if ( !arguments.length ) throw new Error('a `str` param must be given');
    if ( !is.str(str) ) throw new TypeError('invalid type for `str` param');

    str = normalize(str);
    return parse(config, str);
  };
  od.parseStr = od.parseString;

  /**
   * Parses an OnlyData file into an object.
   *
   * @param {string} file - a valid OnlyData file path
   * @return {!Object}
   */
  od.parseFile = function parseOnlyDataFile(file) {

    /** @type {string} */
    var content;

    if ( !arguments.length ) throw new Error('a `file` param must be given');
    if ( !is.str(file)     ) throw new TypeError('invalid type for `file` param');
    if ( !is.file(file)    ) throw new Error('invalid file path for `file` param');
    if ( !hasODExt(file)   ) throw new Error('invalid file extension for `file` param');
    
    content = get.file(file, {
      'buffer':   false,
      'encoding': 'utf8',
      'eol':      'LF'
    });
    return parse(config, content, file);
  };

  /**
   * Sets configuration properties for an OnlyData instance.
   *
   * @param {!Object=} props - new values for OnlyData config props
   * @param {string=} key - a valid OnlyData config prop key
   * @param {*=} val - the new value - use only with `key`
   */
  od.setConfig = function setOnlyDataConfig(props, key, val) {

    if ( !arguments.length ) throw new Error('a `props` param must be given');

    if ( is.str(props) ) {
      if ( arguments.length < 2 ) throw new Error('a `key` and `val` param must be given');

      val = key;
      key = props;

      if ( !has(config, key)    ) throw new Error('invalid `key` param (must be a config prop)');
      if ( !CONF_TYPE[key](val) ) throw new TypeError('invalid type for `val` param');

      config[key] = val;
    }
    else {
      if ( !is.obj(props) ) throw new TypeError('invalid type for `props` param');

      each(props, function(val, key) {
        if ( !has(config, key)    ) throw new Error('invalid key in `props` (all must be config props)');
        if ( !CONF_TYPE[key](val) ) throw new TypeError('invalid value type in `props`');

        config[key] = val;
      });
    }
  };

  /**
   * Resets one or all configuration properties for an OnlyData instance.
   *
   * @param {...string=} key - if defined must be a valid OnlyData config key
   */
  od.resetConfig = function resetOnlyDataConfig(key) {

    if (arguments.length) {
      each(arguments, function(key) {
        if ( !is.str(key)      ) throw new TypeError('invalid type for a `key` param');
        if ( !has(config, key) ) throw new Error('invalid `key` param (must be a config prop)');

        config[key] = CONF_VALS[key];
      });
    }
    else config = fuse(config, CONF_VALS);
  };

  od.construct   = newOnlyData;
  od.constructor = newOnlyData;

  return od;
}

module.exports = newOnlyData;
