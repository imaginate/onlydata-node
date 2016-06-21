/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.2
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
var isNull = (function _build_isNull() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var NULL = /^(?:null|nil)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isNull(val) {
    return has(val, NULL);
  };
})();
