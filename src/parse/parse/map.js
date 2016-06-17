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
