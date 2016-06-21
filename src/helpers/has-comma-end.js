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
