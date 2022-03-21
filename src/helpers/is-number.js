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
 * @param {string} val
 * @return {boolean}
 */
var isNumber = (function _build_isNumber() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var NUM = /^[+-]?[0-9][0-9_,]*(?:\.[0-9][0-9_,]*)?(?:[eE][+-]?[0-9][0-9_,]*)?$/;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isNumber(val) {
    return has(val, NUM);
  };
})();
