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
 * @param {string} ch - one character
 * @return {boolean}
 */
var isKeyChar = (function _build_isKeyChar() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CHARS = (function() {

    /** @type {string} */
    var special;
    /** @type {string} */
    var numeric;
    /** @type {string} */
    var lower;
    /** @type {string} */
    var upper;
    /** @type {string} */
    var chars;

    special = '_-';
    numeric = '0123456789';
    lower   = 'abcdefghijklmnopqrstuvwxyz';
    upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    chars = fuse.string(special, numeric, lower, upper);
    return newCharMap(chars);
  })();

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isKeyChar(ch) {
    return has(CHARS, ch);
  };
})();
