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
