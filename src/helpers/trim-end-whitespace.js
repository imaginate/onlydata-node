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
 * @param {string} content
 * @return {string}
 */
var trimEndWhitespace = (function _build_trimEndWhitespace() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var SPACE = /[ \t\v]+$/;

  /**
   * @param {string} content
   * @return {string}
   */
  return function trimEndWhitespace(content) {
    return cut(content, SPACE);
  };
})();
