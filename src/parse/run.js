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
 * @type {function}
 */
function run() {

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
