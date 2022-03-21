/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
 * @see [OnlyData](https://github.com/imaginate/onlydata)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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
