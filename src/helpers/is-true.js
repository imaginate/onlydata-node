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
 * @param {string} val
 * @return {boolean}
 */
var isTrue = (function _build_isTrue() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var TRUE = /^(?:true|yes)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isTrue(val) {
    return has(val, TRUE);
  };
})();
