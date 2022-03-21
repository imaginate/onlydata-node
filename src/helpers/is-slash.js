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
 * @param {string} ch - one character
 * @return {boolean}
 */
var isSlash = (function _build_isSlash() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var SLASH = {
    '/':  true,
    '\\': true
  };

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isSlash(ch) {
    return has(SLASH, ch);
  };
})();
