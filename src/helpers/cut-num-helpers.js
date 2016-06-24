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
 * @param {string} num
 * @return {string}
 */
var cutNumHelpers = (function _build_cutNumHelpers() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /[,_]/g;

  /**
   * @param {string} num
   * @return {string}
   */
  return function cutNumHelpers(num) {
    REGEX.lastIndex = 0;
    return cut(num, REGEX);
  };
})();
