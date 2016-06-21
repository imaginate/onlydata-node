/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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
function skipWhitespace() {
  while ( isWhitespace(DATA[$i]) ) ++$i;
}

/**
 * @private
 * @type {function}
 */
function skipComment() {
  if ( isHashMark(DATA[$i]) ) {
    ++$i; // note: skip hash mark
    while ( !isLineBreak(DATA[$i]) ) ++$i;
  }
}
