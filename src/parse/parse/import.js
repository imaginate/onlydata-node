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
function parseImport() {

  /** @type {string} */
  var file;
  /** @type {string} */
  var key;
  /** @type {number} */
  var len;
  /** @type {number} */
  var i;

  if ( !isWhitespace(DATA[$i]) ) throw new Error( err('missing a filepath for import') );

  skipWhitespace();
  skipComment();

  $char = DATA[$i];

  if ( isLineBreak($char) ) throw new Error( err('missing a filepath for import') );
  if ( isComma($char)     ) throw new Error( err('missing a filepath for import') );

  if ( isQuoteMark($char) ) parseQuoted();
  else {

    $val = $char;
    while (++$i) {

      $char = DATA[$i];

      if ( isWhitespace($char) ) break;
      if ( isLineBreak($char)  ) break;
      if ( isHashMark($char)   ) break;
      if ( isComma($char)      ) break;

      $val = fuse.string($val, $char);
    }
  }

  file = $val;

  if ( !hasOnlyDataExt(file) ) throw new Error('invalid extension for import filepath');

  // parse: import-paths key
  key = '';
  if ( isAtSign(file[0]) ) {
    len = file.length;
    i = 0;
    while (++i < len) {
      $char = file[i];
      if ( isSlash($char) ) break;
      key = fuse.string(key, $char);
    }
    if ( !has(CONFIG['import-paths'], key) ) throw new Error( err('invalid import-paths key') );
    ++i; // skip: slash
    file = slice.string(file, i);
  }

  file = resolvePath(DIR, key, file);

  // **** ADD ASTERISK CHECK HERE ****

  if ( !is.file(file) ) throw new Error( err('invalid import filepath') );

  $val = get.file(file, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
  $val = parse(CONFIG, $val, file);
}
