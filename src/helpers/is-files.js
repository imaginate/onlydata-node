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
