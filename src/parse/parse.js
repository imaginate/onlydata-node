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
function parse() {

  while ($i < LEN) {

    skipWhitespace();
    skipComment();

    $char = DATA[$i];

    if ( isLineBreak($char) ) {
      ++$i;
      ++$line;
      continue;
    }

    parseKey();
    skipWhitespace();

    if ( !isEqualSign(DATA[$i]) ) throw new Error( err('invalid key assignment') );

    ++$i; // skip equal sign
    skipWhitespace();

    parseValue();

    $map[$key] = $val;
  }
}

/**
 * @private
 * @type {function}
 */
function parseKey() {

  if ( !isOpenKeyChar($char) ) throw new Error( err('invalid open key character') );

  $key = $char;
  while (++$i < LEN) {

    $char = DATA[$i];

    if ( !isKeyChar($char) ) break;

    $key = fuse.string($key, $char);
  }
}

/**
 * @private
 * @type {function}
 */
function parseValue() {

  $char = DATA[$i];

  if ( isLineBreak($char) || isHashMark($char) ) throw new Error( err('missing a value') );

  if ( isQuoteMark($char) ) return parseQuoted();
  if ( isListOpen($char)  ) return parseList();
  if ( isMapOpen($char)   ) return parseMap();

  if ( isLessSign($char) && isLessSign(DATA[$i + 1]) ) {
    return isLessSign(DATA[$i + 2])
      ? parseRawBlock()
      : parseBlock();
  }

  while ($i < LEN) {

    $char = DATA[$i];

  }
}
