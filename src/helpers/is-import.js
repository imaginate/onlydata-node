/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-alpha
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
var isImport = (function _build_isImport() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var KEY = /^import$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isImport(val) {
    return has(val, KEY);
  };
})();
