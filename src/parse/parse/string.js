/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

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
  var ch;

  LINE = $line; // save: starting line number

  $i = $i + 2; // skip: opening less than signs

  skipWhitespace();
  skipComment();

  if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid string block opening') );

  ++$line;

  // build: string
  $val = '';
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
      continue;
    }

    // close: string block
    if ( isMoreSign($char) && isMoreSign(DATA[$i + 1]) ) break;

    // save: leading whitespace or greater than sign
    if ( isBackslash($char) ) {
      ch = DATA[$i + 1];
      if ( isWhitespace(ch) || isMoreSign(ch) ) {
        ++$i; // skip: backslash
        $char = ch;
      }
    }

    parseBlockLine();
  }

  $i = $i + 2; // skip: closing greater than signs
}

/**
 * Parse a line of a string block.
 *
 * @private
 * @type {function}
 */
function parseBlockLine() {

  /** @type {string} */
  var line;

  // build: line string
  line = $char;
  while (++$i) {

    skipComment();

    $char = DATA[$i];

    if ( isLineBreak($char) ) break;

    line = fuse.string(line, $char);
  }

  ++$line;

  line = trimEndWhitespace(line);
  $val = fuse.string($val, line);
}

/**
 * Parse a raw string block.
 *
 * @private
 * @type {function}
 */
function parseRawBlock() {

  /** @type {number} */
  var LINE;
  /** @type {number} */
  var i;

  LINE = $line; // save: starting line number

  $i = $i + 3; // skip: opening less than signs

  skipWhitespace();
  skipComment();

  if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid raw string block opening') );

  ++$line;

  // build: raw string
  $val = '';
  while (++$i) {

    if ($i >= LEN) {
      $line = LINE;
      throw new Error( err('missing closing `>>>` for raw string block') );
    }

    $char = DATA[$i];

    // close: raw string block with leading whitespace
    if ( isWhitespace($char) ) {
      i = $i + 1;
      while ( isWhitespace(DATA[i]) ) ++i;
      if ( isMoreSign(DATA[i])     &&
           isMoreSign(DATA[i + 1]) &&
           isMoreSign(DATA[i + 2]) ) {
        break;
      }
    }
    // close: raw string block
    else if ( isMoreSign($char)        &&
              isMoreSign(DATA[$i + 1]) &&
              isMoreSign(DATA[$i + 2]) ) {
      break;
    }
    // increment: line number
    else if ( isLineBreak($char) ) ++$line;

    $val = fuse.string($val, $char);
  }

  $val = slice.string($val, 0, -1); // trim: line break

  $i = $i + 3; // skip: closing greater than signs
}
