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

/**
 * The OnlyData constructor.
 *
 * @public
 * @return {!Function{
 *   parse:       function,
 *   parseString: function,
 *   parseBuffer: function,
 *   parseFile:   function,
 *   getConfig:   function,
 *   setConfig:   function,
 *   resetConfig: function
 * }}
 */
var newOnlyData = (function _build_newOnlyData() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ERR_MSG = {
    'content': 'invalid type for `content` param',
    'file': {
      'type': 'invalid type for `file` param',
      'path': 'invalid filepath for `file` param',
      'ext':  'invalid file extension for `file` param'
    }
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CONF_ERR_MSG = {
    'get': {
      'type': 'invalid type for `prop` param',
      'key':  'invalid `prop` param (must be a config key name)'
    },
    'set': {
      'key':  'invalid `prop` param (must be a config key name)',
      'val':  'invalid type for `val` param',
      'type': 'invalid type for `props` param',
      'keys': 'invalid prop key in `props` obj (must be config key names)',
      'vals': 'invalid type for a prop value in `props` obj'
    },
    'reset': {
      'type': 'invalid type for `prop` param',
      'key':  'invalid `prop` param (must be a config key name)'
    }
  };

  /**
   * The OnlyData constructor.
   *
   * @public
   * @return {!Function<string, function>}
   */
  function newOnlyData() {

    /** @type {!Function} */
    var onlydata;
    /** @type {!Object} */
    var config;
    /** @type {string} */
    var CWD;

    // set: current working directory
    CWD = process.cwd();

    // make: new config instance
    config = copy(CONF_VALUES);

    // make: new onlydata instance
    onlydata = function parseOnlyDataBase(content) {
      return parseOnlyData(content);
    };

    // parse methods
    onlydata.parse       = parseOnlyData;
    onlydata.parseString = parseOnlyDataString;
    onlydata.parseBuffer = parseOnlyDataBuffer;
    onlydata.parseFile   = parseOnlyDataFile;

    // config methods
    onlydata.getConfig   = function getOnlyDataConfig(prop) {
      switch (arguments.length) {
        case 0: return getConfig();
        case 1: return is.array(prop)
          ? getConfigProps(prop)
          : getConfigProp(prop);
      }
      return getConfigProps(arguments);
    };
    onlydata.setConfig   = function setOnlyDataConfig(prop, val) {
      return is.string(prop)
        ? setConfigProp(prop, val)
        : setConfigProps(prop);
    };
    onlydata.resetConfig = function resetOnlyDataConfig(prop) {
      switch (arguments.length) {
        case 0: return resetConfig();
        case 1: return is.array(prop)
          ? resetConfigProps(prop)
          : resetConfigProp(prop);
      }
      return resetConfigProps(arguments);
    };

    // constructor
    onlydata.construct   = newOnlyData;
    onlydata.constructor = newOnlyData;

    return onlydata;

    /**
     * Parses OnlyData content into an object.
     *
     * @public
     * @param {(string|!Buffer)} content - Must be a string (or buffered string)
     *   of OnlyData or a valid OnlyData filepath.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyData(content) {

      if ( is.buffer(content) ) return parseOnlyDataBuffer(content);

      if ( !is.string(content) ) throw new TypeError(ERR_MSG.content);

      return is.file(content)
        ? parseOnlyDataFile(content)
        : parseOnlyDataString(content);
    }

    /**
     * Parses a string of OnlyData content into an object.
     *
     * @public
     * @param {string} content - Must be a string of OnlyData.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataString(content) {

      if ( !is.string(content) ) throw new TypeError(ERR_MSG.content);

      prepImportPaths();
      content = normalizeEol(content);
      return parse(config, content);
    }

    /**
     * Parses a string of OnlyData content into an object.
     *
     * @public
     * @param {!Buffer} content - Must be a buffered string of OnlyData.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataBuffer(content) {

      if ( !is.buffer(content) ) throw new TypeError(ERR_MSG.content);

      prepImportPaths();
      content = to.string(content);
      content = normalizeEol(content);
      return parse(config, content);
    }

    /**
     * Parses an OnlyData file into an object.
     *
     * @public
     * @param {string} file - Must be a valid OnlyData filepath.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataFile(file) {

      /** @type {string} */
      var content;

      if ( !is.string(file) ) throw new TypeError(ERR_MSG.file.type);
      if ( !is.file(file)   ) throw new Error(ERR_MSG.file.path);
      if ( !hasOnlyDataExt(file) ) throw new Error(ERR_MSG.file.ext);

      prepImportPaths();
      content = get.file(file, {
        'buffer':   false,
        'encoding': 'utf8',
        'eol':      'LF'
      });
      return parse(config, content, file);
    }

    /**
     * Gets a copy of all configuration properties for an OnlyData instance.
     *
     * @public
     * @return {!Object} - A clone of the OnlyData instance's config.
     */
    function getConfig() {
      return copy.object(config, true);
    }

    /**
     * Gets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     * @return {*} - The value of the OnlyData instance's config property.
     */
    function getConfigProp(prop) {

      if ( !is.string(prop) ) throw new TypeError(CONF_ERR_MSG.get.type);
      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.get.key);

      return copy(config[prop], true);
    }

    /**
     * Gets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {(!Array<string>|!Arguments<string>)} props - The OnlyData config
     *   property key names to get.
     * @return {!Object} - A clone of the config property values.
     */
    function getConfigProps(props) {

      /** @type {!Object} */
      var result;

      result = {};
      each(props, function(prop) {
        result[prop] = getConfigProp(prop);
      });
      return result;
    }

    /**
     * Sets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     * @param {*} val - The new config property value.
     */
    function setConfigProp(prop, val) {

      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.set.key);
      if ( !CONF_TYPES[prop](val) ) throw new TypeError(CONF_ERR_MSG.set.val);

      config[prop] = val;
    }

    /**
     * Sets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {!Object} props - The new values for OnlyData config properties.
     */
    function setConfigProps(props) {

      if ( !is.object(props) ) throw new TypeError(CONF_ERR_MSG.set.type);

      each(props, function(val, prop) {
        if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.set.keys);
        if ( !CONF_TYPES[prop](val) ) throw new TypeError(CONF_ERR_MSG.set.vals);

        config[prop] = val;
      });
    }

    /**
     * Resets all configuration properties for an OnlyData instance.
     *
     * @public
     * @type {function}
     */
    function resetConfig() {
      config = fuse(config, CONF_VALUES);
    }

    /**
     * Resets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     */
    function resetConfigProp(prop) {

      if ( !is.string(prop) ) throw new TypeError(CONF_ERR_MSG.reset.type);
      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.reset.key);

      config[prop] = CONF_VALUES[prop];
    }

    /**
     * Resets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {(!Array<string>|!Arguments<string>)} props - The OnlyData config
     *   property key names to reset.
     */
    function resetConfigProps(props) {
      each(props, resetConfigProp);
    }

    /**
     * @private
     * @type {function}
     */
    function prepImportPaths() {
      config['import-paths'] = remap.obj(config['import-paths'], function(path) {
        return resolvePath(CWD, path);
      });
    }
  }

  return newOnlyData;
})();
