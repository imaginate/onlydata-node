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
 * @param {string} ch - one character
 * @return {boolean}
 */
var isListOpen = (function _build_isListOpen() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var OPEN = '[';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isListOpen(ch) {
    return same(ch, OPEN);
  };
})();
