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
var isInteger = (function _build_isInteger() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var INT = /^[+-]?[1-9][0-9]?[0-9]?(?:[_,]?[0-9]{3})*$/;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isInteger(val) {
    return has(val, INT);
  };
})();
