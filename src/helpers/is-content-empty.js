/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta
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
var isContentEmpty = (function _build_isContentEmpty() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EMPTY = /^\s+$/;

  /**
   * @param {string} content
   * @return {boolean}
   */
  return function isContentEmpty(content) {
    return !content || has(content, EMPTY);
  };
})();
