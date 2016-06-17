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
 * @param {boolean=} inlineOnly
 */
function parseList(inlineOnly) {

  ++$i; // skip: opening square bracket

  skipWhitespace();
  skipComment();

  if ( isLineBreak(DATA[$i]) ) {

    if (inlineOnly) throw new Error( err('invalid list (nested lists must be inline)') );

    parseMultiList();
  }
  else parseInlineList();

  ++$i; // skip: closing square bracket
}

/**
 * @private
 * @type {function}
 */
function parseInlineList() {

  /** @type {!Array} */
  var list;

  list = [];

  while ($i) {

    skipWhitespace();

    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing closing square bracket for inline list') );
    if ( isComma($char)     ) throw new Error( err('missing a list value') );

    if ( isListClose($char) ) break;

    if ( isQuoteMark($char) ) parseQuoted();
    else parseInlineListValue();

    list = fuse.value(list, $val);

    skipWhitespace();

    $char = DATA[$i];

    if ( isListClose($char) ) break;

    if ( !isComma($char) ) throw new Error( err('missing a comma for inline list') );

    ++$i; // skip: comma
  }

  $val = list;
}

/**
 * @private
 * @type {function}
 */
function parseInlineListValue() {

  $val = $char;
  while (++$i) {

    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing closing square bracket for inline list') );

    if ( isWhitespace($char) ) break;
    if ( isListClose($char)  ) break;
    if ( isComma($char)      ) break;

    $val = fuse.string($val, $char);
  }

  if ( isNull($val)    ) return parseNull();
  if ( isBoolean($val) ) return parseBoolean();
  if ( isInteger($val) ) return parseInteger();
  if ( isFloat($val)   ) return parseFloatNum();

  throw new Error( err('an invalid value for inline list') );
}

/**
 * @private
 * @type {function}
 */
function parseMultiList() {

  /** @type {number} */
  var LINE;
  /** @type {!Array} */
  var list;
  /** @type {boolean} */
  var flag;

  LINE = $line; // save: starting line number

  ++$line;

  list = [];

  while (++$i) {

    if ($i >= LEN) {
      $line = LINE;
      throw new Error( err('missing closing list square bracket') );
    }

    skipWhitespace();
    skipComment();

    $char = DATA[$i];

    if ( isLineBreak($char) ) {
      ++$line;
      continue;
    }

    if ( isListClose($char) ) break;

    if ( isComma($char) ) throw new Error( err('missing a list value') );

    parseMultiListValue();

    list = fuse.value(list, $val);

    skipWhitespace();

    if (flag) parseMultiListComma();
    else flag = setMultiListComma();

    skipWhitespace();
    skipComment();

    if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid syntax after list value') );

    ++$line;
  }

  $val = list;
}

/**
 * @private
 * @type {function}
 */
function parseMultiListValue() {

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
  if ( isInteger($val) ) return parseInteger();
  if ( isFloat($val)   ) return parseFloatNum();

  parseString();

  // backtrack and trim: comma
  if ( hasCommaEnd($val) ) {
    $val = slice.string($val, 0, -1);
    --$i; // backtrack: line break or hash mark
    while ( isWhitespace(DATA[$i]) ) --$i;
    --$i; // backtrack: comma
  }
}

/**
 * @private
 * @return {boolean}
 */
function setMultiListComma() {
  COMMA = isComma(DATA[$i]);
  return true;
}

/**
 * @private
 * @type {function}
 */
function parseMultiListComma() {

  /** @type {number} */
  var i;

  if ( isComma(DATA[$i]) ) {
    if (!COMMA) throw new Error( err('invalid list comma') );
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
