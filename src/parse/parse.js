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

    ++$i; // note: skip equal sign
    skipWhitespace();

    parseValue();

    $map[$key] = $val;

    skipWhitespace();
    skipComment();

    if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid syntax after value') );

    ++$line;
    ++$i;
  }
}

/**
 * @private
 * @type {function}
 */
function parseKey() {

  if ( !isOpenKeyChar($char) ) throw new Error( err('invalid open key character') );

  $key = $char;
  while (++$i) {

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

/**
 * @private
 * @type {function}
 */
function parseNull() {
  $val = null;
}

/**
 * @private
 * @type {!RegExp}
 * @const
 */
var TRUE = /^(?:true|yes)$/i;

/**
 * @private
 * @type {function}
 */
function parseBoolean() {
  $val = has($val, TRUE);
}

/**
 * @private
 * @type {function}
 */
function parseInteger() {
  $val = parseInt($val);
}

/**
 * @private
 * @type {function}
 */
function parseFloatNum() {
  $val = parseFloat($val);
}

/**
 * Parse a basic string.
 *
 * @private
 * @type {function}
 */
function parseString() {

  if ( isLineBreak($char) ) return;
  if ( isHashMark($char)  ) return;

  $val = fuse.string($val, $char);

  while (++$i) {

    $char = DATA[$i];

    if ( isLineBreak($char) ) break;
    if ( isHashMark($char)  ) break;

    $val = fuse.string($val, $char);
  }

  $val = trimWhitespace($val);
}

/**
 * Parse a quoted string.
 *
 * @private
 * @type {function}
 */
function parseQuoted() {

  /** @type {string} */
  var QUOTE;

  QUOTE = $char;

  // note: build the string
  $val = '';
  while (++$i) {
  
    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing closing quote mark') );

    if ( same(QUOTE, $char) ) break;

    // note: save escaped quote
    if ( isBackslash($char) && same(QUOTE, DATA[$i + 1]) ) {
      ++$i; // note: skip backslash
      $char = DATA[$i];
    }

    $val = fuse.string($val, $char);
  }

  ++$i; // note: skip closing quote mark
}
