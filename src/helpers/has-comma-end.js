/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
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
