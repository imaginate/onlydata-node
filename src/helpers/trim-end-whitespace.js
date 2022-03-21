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
