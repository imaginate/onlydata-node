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
