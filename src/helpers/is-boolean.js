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
