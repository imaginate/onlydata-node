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

    $char = DATA[$i];

    if ( isLineBreak($char) ) {
      ++$i;
      ++$line;
      continue;
    }

    if ( isHashMark($char) ) {
      skipComment();
      continue;
    }

    parseKey();
    skipWhitespace();

    if ( !isEqualSign(DATA[$i]) ) throw new Error( err('invalid assignment') );

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

  while ($i < LEN) {

    $char = DATA[$i];

    //
  }
}

/**
 * @private
 * @type {function}
 */
function parseValue() {

  while ($i < LEN) {

    $char = DATA[$i];

    if ( isLineBreak($char) || isHashMark($char) ) throw new Error( err('missing a value') );

    /*
    // parse lists, maps, and string blocks (i.e. multi-line values)
      val = isList(val)
        ? parseList(lines, i, file)
        : isMap(val)
          ? parseMap(lines, i, file)
          : isBlock(val)
            ? parseBlock(lines, i, file)
            : val;

      // save list, map, or string block result
      if ( is.obj(val) ) {
        i   = val.index;
        val = val.value;
      }
      else {
        // parse remaining data types
        val = isQuoted(val)
          ? parseQuoted(val, i, file)
          : isNull(val)
            ? null
            : isBoolean(val)
              ? parseBoolean(val)
              : isImport(val)
                ? parseImport(config, val, i, file)
                : isNumber(val)
                  ? parseNumber(val)
                  : parseString(val);
      }
      */
  }
}
