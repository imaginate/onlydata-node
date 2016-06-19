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
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFiles = (function _build_isFiles() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /^(?:.*[\\/])?\*\.(?:od|only|onlydata)$/i;

  /**
   * @param {string} path
   * @return {boolean}
   */
  return function isFiles(path) {
    return has(path, REGEX);
  };
})();
