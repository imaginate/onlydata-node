/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.2
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
 * @return {boolean}
 */
function setComma() {
  COMMA = isComma(DATA[$i]);
  if (COMMA) ++$i; // skip: comma
  return true;
}

/**
 * @private
 * @type {function}
 */
function parseListComma() {

  /** @type {number} */
  var i;

  if ( isComma(DATA[$i]) ) {
    if (!COMMA) throw new Error( err('invalid list comma') );
    ++$i; // skip: comma
  }
  // check: last value
  else if (COMMA) {

    // skip: line
    i = $i + 1;
    while ( !isLineBreak(DATA[i]) ) ++i;
    ++i; // skip: line break

    // skip: whitespace
    while ( isWhitespace(DATA[i]) ) ++i;

    if ( !isListClose(DATA[i]) ) throw new Error( err('invalid list comma') );
  }
}

/**
 * @private
 * @type {function}
 */
function parseMapComma() {

  /** @type {number} */
  var i;

  if ( isComma(DATA[$i]) ) {
    if (!COMMA) throw new Error( err('invalid map comma') );
    ++$i; // skip: comma
  }
  // check: last value
  else if (COMMA) {

    // skip: line
    i = $i + 1;
    while ( !isLineBreak(DATA[i]) ) ++i;
    ++i; // skip: line break

    // skip: whitespace
    while ( isWhitespace(DATA[i]) ) ++i;

    if ( !isMapClose(DATA[i]) ) throw new Error( err('invalid map comma') );
  }
}
