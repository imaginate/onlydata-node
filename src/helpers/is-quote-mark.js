/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.1
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
var isQuoteMark = (function _build_isQuoteMark() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var QUOTES = {
    '"': true,
    "'": true
  };

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isQuoteMark(ch) {
    return has(QUOTES, ch);
  };
})();
