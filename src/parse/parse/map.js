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
function parseMap(inlineOnly) {

  /** @type {string} */
  var KEY;

  ++$i; // skip: opening curly brace

  KEY = $key; // save: base key

  skipWhitespace();
  skipComment();

  if ( isLineBreak(DATA[$i]) ) {

    if (inlineOnly) throw new Error( err('invalid map (nested maps must be inline)') );

    parseMultiMap();
  }
  else parseInlineMap();

  $key = KEY;

  ++$i; // skip: closing curly brace
}

/**
 * @private
 * @type {function}
 */
function parseInlineMap() {

  /** @type {!Object} */
  var map;

  map = {};

  while ($i) {

    skipWhitespace();

    $char = DATA[$i];

    if ( isMapClose($char) ) break;

    parseKey();
    skipWhitespace();

    if ( !isColon(DATA[$i]) ) throw new Error( err('invalid key assignment') );

    ++$i; // skip: colon
    skipWhitespace();

    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing a map value') );
    if ( isComma($char)     ) throw new Error( err('missing a map value') );

    if ( isQuoteMark($char) ) parseQuoted();
    else parseInlineMapValue();

    map[$key] = $val;

    skipWhitespace();

    $char = DATA[$i];

    if ( isMapClose($char) ) break;

    if ( !isComma($char) ) throw new Error( err('missing a comma for inline map') );

    ++$i; // skip: comma
  }

  $val = map;
}

/**
 * @private
 * @type {function}
 */
function parseInlineMapValue() {

  $val = $char;
  while (++$i) {

    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing closing curly brace for inline map') );

    if ( isWhitespace($char) ) break;
    if ( isMapClose($char)   ) break;
    if ( isComma($char)      ) break;

    $val = fuse.string($val, $char);
  }

  if ( isNull($val)    ) return parseNull();
  if ( isBoolean($val) ) return parseBoolean();
  if ( isInteger($val) ) return parseInteger();
  if ( isFloat($val)   ) return parseFloatNum();

  throw new Error( err('an invalid value for inline map') );
}

/**
 * @private
 * @type {function}
 */
function parseMultiMap() {

  /** @type {number} */
  var LINE;
  /** @type {boolean} */
  var flag;
  /** @type {!Object} */
  var map;

  LINE = $line; // save: starting line number

  ++$line;

  map = {};

  while (++$i) {

    if ($i >= LEN) {
      $line = LINE;
      throw new Error( err('missing closing map curly brace') );
    }

    skipWhitespace();
    skipComment();

    $char = DATA[$i];

    if ( isLineBreak($char) ) {
      ++$line;
      continue;
    }

    if ( isMapClose($char) ) break;

    parseKey();
    skipWhitespace();

    if ( !isColon(DATA[$i]) ) throw new Error( err('invalid key assignment') );

    ++$i; // skip: colon
    skipWhitespace();

    $char = DATA[$i];

    if ( isLineBreak($char) ) throw new Error( err('missing a map value') );
    if ( isComma($char)     ) throw new Error( err('missing a map value') );

    parseNestedValue();

    map[$key] = $val;

    skipWhitespace();

    if (flag) parseMapComma();
    else flag = setComma();

    skipWhitespace();
    skipComment();

    if ( !isLineBreak(DATA[$i]) ) throw new Error( err('invalid syntax after map value') );

    ++$line;
  }

  $val = map;
}
