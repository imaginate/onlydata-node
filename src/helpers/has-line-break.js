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
 * @param {string} content
 * @return {boolean}
 */
var hasLineBreak = (function _build_hasLineBreak() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /[\r\n]/;

  /**
   * @param {string} content
   * @return {boolean}
   */
  return function hasLineBreak(content) {
    return has(content, REGEX);
  };
})();
