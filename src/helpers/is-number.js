/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.3
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
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
