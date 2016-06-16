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
  if ( isInteger($val) ) return parseInteger();
  if ( isFloat($val)   ) return parseFloatNum();

  parseString();
}
