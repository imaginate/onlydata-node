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
function parseValue() {

  $char = DATA[$i];

  if ( isLineBreak($char) || isHashMark($char) ) throw new Error( err('missing a value') );

  // parse: quoted string, list, map
  if ( isQuoteMark($char) ) return parseQuoted();
  if ( isListOpen($char)  ) return parseList();
  if ( isMapOpen($char)   ) return parseMap();

  // parse: string block
  if ( isLessSign($char) && isLessSign(DATA[$i + 1]) ) {
    return isLessSign(DATA[$i + 2])
      ? parseRawBlock()
      : parseBlock();
  }

  // parse: basic string, number, boolean, null, import

  $val = $char;
  while (++$i) {

    $char = DATA[$i];

    if ( isWhitespace($char) ) break;
    if ( isLineBreak($char)  ) break;
    if ( isHashMark($char)   ) break;

    $val = fuse.string($val, $char);
  }

  if ( isNull($val)    ) return parseNull();
  if ( isBoolean($val) ) return parseBoolean();
  if ( isImport($val)  ) return parseImport();
  if ( isNumber($val)  ) return parseNumber();

  parseString();
}

/**
 * @private
 * @type {function}
 */
function parseNestedValue() {

  /** @type {number} */
  var i;

  // parse: quoted string, list, map
  if ( isQuoteMark($char) ) return parseQuoted();
  if ( isListOpen($char)  ) return parseList(true);
  if ( isMapOpen($char)   ) return parseMap(true);

  // error: string block
  if ( isLessSign($char) && isLessSign(DATA[$i + 1]) ) throw new Error( err('invalid string (nested strings must be inline)') );

  // parse: basic string, number, boolean, null, import

  $val = $char;
  while (++$i) {

    $char = DATA[$i];

    if ( isWhitespace($char) ) break;
    if ( isLineBreak($char)  ) break;
    if ( isHashMark($char)   ) break;

    $val = fuse.string($val, $char);
  }

  // backtrack and trim: comma
  if ( isComma(DATA[$i - 1]) ) {
    --$i;
    $val = slice.string($val, 0, -1);
  }

  if ( isNull($val)    ) return parseNull();
  if ( isBoolean($val) ) return parseBoolean();
  if ( isImport($val)  ) return parseImport();
  if ( isNumber($val)  ) return parseNumber();

  parseString();

  // backtrack and trim: comma
  if ( hasCommaEnd($val) ) {
    $val = slice.string($val, 0, -1);
    --$i; // backtrack: line break or hash mark
    while ( isWhitespace(DATA[$i]) ) --$i;
    --$i; // backtrack: comma
  }
}
