/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.2
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
 * @param {string} content
 * @return {boolean}
 */
var hasLineBreak = (function _build_hasLineBreak() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /[\r\n]/;

  /**
   * @param {string} content
   * @return {boolean}
   */
  return function hasLineBreak(content) {
    return has(content, REGEX);
  };
})();
