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
