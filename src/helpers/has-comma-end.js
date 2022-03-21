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
 * @param {string} str
 * @return {boolean}
 */
var hasCommaEnd = (function _build_hasCommaEnd() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var END = /,$/;

  /**
   * @param {string} str
   * @return {boolean}
   */
  return function hasCommaEnd(str) {
    return has(str, END);
  };
})();
