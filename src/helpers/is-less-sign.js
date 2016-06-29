/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.3
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
var isLessSign = (function _build_isLessSign() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var SIGN = '<';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isLessSign(ch) {
    return same(ch, SIGN);
  };
})();
