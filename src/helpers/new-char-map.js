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
