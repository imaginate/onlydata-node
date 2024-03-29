/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
 * @see [OnlyData](https://github.com/imaginate/onlydata)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

/**
 * @private
 * @type {!Object<string, function>}
 * @const
 */
var CONF_SETTERS = {

  /**
   * @private
   * @param {!Object} config
   * @param {?Object<string, string>=} val
   */
  'import-paths': function(config, val) {

    /** @type {string} */
    var cwd;

    if ( !is('?stringMap=', val) ) throw new TypeError('invalid `import-paths` value');

    if (val) {
      cwd = config['cwd'] || process.cwd();
      val = remap(val, function(path) {
        path = resolvePath(cwd, path);
        if ( is.dir(path) ) return path;
        else throw new Error( fuse('invalid `import-paths` dirpath - `', path, '`') );
      });
    }

    config['import-paths'] = val || {};
  },

  /**
   * @private
   * @param {!Object} config
   * @param {?string=} val
   */
  'cwd': function(config, val) {

    /** @type {string} */
    var cwd;

    if ( !is('?string=', val) ) throw new TypeError('invalid `cwd` value');

    if (val) {
      cwd = config['cwd'] || process.cwd();
      val = resolvePath(cwd, val);
      if ( !is.dir(val) ) throw new Error( fuse('invalid `cwd` dirpath - `', val, '`') );
    }

    config['cwd'] = val || '';
  }

};
