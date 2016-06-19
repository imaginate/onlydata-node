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
 * @param {string} ch - one character
 * @return {boolean}
 */
var isSlash = (function _build_isSlash() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var SLASH = {
    '/':  true,
    '\\': true
  };

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isSlash(ch) {
    return has(SLASH, ch);
  };
})();
