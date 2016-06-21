/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.3
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
