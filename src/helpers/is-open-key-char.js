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
 * @param {string} ch - one character
 * @return {boolean}
 */
var isOpenKeyChar = (function _build_isOpenKeyChar() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CHARS = (function() {

    /** @type {string} */
    var special;
    /** @type {string} */
    var lower;
    /** @type {string} */
    var upper;
    /** @type {string} */
    var chars;

    special = '_';
    lower   = 'abcdefghijklmnopqrstuvwxyz';
    upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    chars = fuse.string(special, lower, upper);
    return newCharMap(chars);
  })();

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isOpenKeyChar(ch) {
    return has(CHARS, ch);
  };
})();
