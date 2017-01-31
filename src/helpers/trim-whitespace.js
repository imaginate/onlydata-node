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
var trimWhitespace = (function _build_trimWhitespace() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var A = /^[ \t\v]+/;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var Z = /[ \t\v]+$/;

  /**
   * @param {string} content
   * @return {string}
   */
  return function trimWhitespace(content) {
    content = cut(content, A);
    return cut(content, Z);
  };
})();
