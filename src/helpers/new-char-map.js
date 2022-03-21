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
 * @param {string} chars
 * @return {!Object}
 */
function newCharMap(chars) {

  /** @type {!Object} */
  var map;
  /** @type {number} */
  var len;
  /** @type {string} */
  var ch;
  /** @type {number} */
  var i;

  map = {};
  len = chars.length;
  i = -1;
  while (++i < len) {
    ch = chars[i];
    map[ch] = true;
  }
  return map;
}
