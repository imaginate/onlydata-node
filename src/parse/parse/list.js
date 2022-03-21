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

    parseNestedValue();

    list = fuse.value(list, $val);

    skipWhitespace();

    if (flag) parseListComma();
    else flag = setComma();

    skipWhitespace();
    skipComment();

    if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid syntax after list value') );

    ++$line;
  }

  $val = list;
}
