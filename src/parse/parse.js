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

    ++$i; // skip: equal sign
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

  $val = trimEndWhitespace($val);
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

  // build: string
  $val = '';
  while (++$i) {
  
    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing closing quote mark') );

    if ( same(QUOTE, $char) ) break;

    // save: escaped quote
    if ( isBackslash($char) && same(QUOTE, DATA[$i + 1]) ) {
      ++$i; // skip: backslash
      $char = DATA[$i];
    }

    $val = fuse.string($val, $char);
  }

  ++$i; // skip: closing quote mark
}

/**
 * Parse a string block.
 *
 * @private
 * @type {function}
 */
function parseBlock() {

  /** @type {number} */
  var LINE;
  /** @type {string} */
  var val;
  /** @type {string} */
  var ch;

  LINE = $line; // save: starting line number

  $i = $i + 2; // skip: opening less than signs

  skipWhitespace();
  skipComment();

  if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid string block opening') );

  ++$line;

  $val = '';

  main:
  while (++$i) {

    if ($i >= LEN) {
      $line = LINE;
      throw new Error( err('missing closing `>>` for string block') );
    }

    skipWhitespace();
    skipComment();

    $char = DATA[$i];

    if ( isLineBreak($char) ) {
      ++$line;
      continue main;
    }

    // close: string block
    if ( isMoreSign($char) && isMoreSign(DATA[$i + 1]) ) break main;

    // save: leading whitespace or greater than sign
    if ( isBackslash($char) ) {
      ch = DATA[$i + 1];
      if ( isWhitespace(ch) || isMoreSign(ch) ) {
        ++$i; // skip: backslash
        $char = ch;
      }
    }

    val = $char;

    // build: string of remaining line
    sub:
    while (++$i) {

      skipComment();

      $char = DATA[$i];

      if ( isLineBreak($char) ) {
        ++$line;
        break sub;
      }

      val = fuse.string(val, $char);
    }

    val = trimEndWhitespace(val);
    $val = fuse.string($val, val);
  }

  $i = $i + 2; // skip: closing greater than signs
}
