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
 * @type {function}
 */
function parseNumber() {
  if ( isInteger($val) ) return parseInteger();
  if ( isFloat($val)   ) return parseFloatNum();
  throw new Error( err('invalid number') );
}

/**
 * @private
 * @type {function}
 */
function parseInteger() {
  $val = cutNumHelpers($val);
  $val = parseInt($val);
}

/**
 * @private
 * @type {function}
 */
function parseFloatNum() {
  $val = cutNumHelpers($val);
  $val = parseFloat($val);
}
