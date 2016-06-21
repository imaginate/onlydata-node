/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.2
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
 * @param {string} file
 * @return {boolean}
 */
var hasOnlyDataExt = (function _build_hasOnlyDataExt() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EXT = /\.(?:od|only|onlydata)$/i;

  /**
   * @param {string} file
   * @return {boolean}
   */
  return function hasOnlyDataExt(file) {
    return has(file, EXT);
  };
})();
