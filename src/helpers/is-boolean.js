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
var isBoolean = (function _build_isBoolean() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var BOOL = /^(?:true|false|yes|no)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isBoolean(val) {
    return has(val, BOOL);
  };
})();
