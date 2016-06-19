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

  if ( isFiles(file) ) parseDir(file);
  else parseFile(file);
}

/**
 * @private
 * @param {string} file
 */
function parseFile(file) {

  /** @type {string} */
  var content;

  if ( !is.file(file) ) throw new Error( err('invalid import filepath') );

  content = get.file(file, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
  $val = parse(CONFIG, content, file);
}

/**
 * @private
 * @param {string} path
 */
function parseDir(path) {

  /** @type {!Array} */
  var files;
  /** @type {!Object} */
  var map;
  /** @type {string} */
  var dir;
  /** @type {string} */
  var ext;
  /** @type {string} */
  var key;

  dir = getDirpath(path);
  ext = getExtname(path);

  if ( !is.dir(dir) ) throw new Error( err('invalid import dirpath') );

  files = get.filepaths(dir, {
    'basepath': true,
    'validExts': ext
  });
  map = {};
  each(files, function(file) {
    key = getBasename(file, ext);
    parseFile(file);
    map[key] = $val;
  });

  $val = map;
}
