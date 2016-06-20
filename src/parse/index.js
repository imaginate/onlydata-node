/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.1
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
 * @param {!Object} config
 * @param {string} data
 * @param {string=} file
 * @return {!Object}
 */
function parse(config, data, file) {

  /**
   * @private
   * @type {boolean}
   * @const
   */
  var COMMA;

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CONF;

  /**
   * @private
   * @type {string}
   * @const
   */
  var DATA;

  /**
   * @private
   * @type {string}
   * @const
   */
  var FILE;

  /**
   * @private
   * @type {string}
   * @const
   */
  var DIR;

  /**
   * @private
   * @type {number}
   * @const
   */
  var LEN;

  /**
   * @private
   * @type {number}
   */
  var $line;

  /**
   * @private
   * @type {string}
   */
  var $char;

  /**
   * @private
   * @type {string}
   */
  var $key;

  /**
   * @private
   * @type {*}
   */
  var $val;

  /**
   * @public
   * @type {!Object}
   */
  var $map;

  /**
   * @private
   * @type {number}
   */
  var $i;

  /**
   * @private
   * @param {!Object} config
   * @param {string} data
   * @param {string=} file
   */
  function init(config, data, file) {

    file = file || '';

    if ( !is.obj(config) ) throw new TypeError('invalid type for `config` param');
    if ( !is.str(data)   ) throw new TypeError('invalid type for `data` param');
    if ( !is.str(file)   ) throw new TypeError('invalid type for `file` param');

    if ( isContentEmpty(data) ) return {};

    CONF = config;
    DATA = fuse.string(data, '\n');
    FILE = file && resolvePath(file);
    LEN  = DATA.length;
    DIR  = FILE && getDirpath(FILE);

    $line = 1;
    $map  = {};
    $i    = 0;

    run();
  }

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

  /**
   * @private
   * @type {function}
   */
  function skipWhitespace() {
    while ( isWhitespace(DATA[$i]) ) ++$i;
  }

  /**
   * @private
   * @type {function}
   */
  function skipComment() {
    if ( isHashMark(DATA[$i]) ) {
      ++$i; // note: skip hash mark
      while ( !isLineBreak(DATA[$i]) ) ++$i;
    }
  }

  /**
   * @private
   * @param {string} msg
   * @return {string}
   */
  function err(msg) {
    return FILE
      ? fuse.string(msg, ' at line `', $line, '` in file `', FILE, '`')
      : fuse.string(msg, ' at line `', $line, '`');
  }

  /**
   * @private
   * @type {function}
   */
  function parseBoolean() {
    $val = isTrue($val);
  }

  /**
   * @private
   * @return {boolean}
   */
  function setComma() {
    COMMA = isComma(DATA[$i]);
    if (COMMA) ++$i; // skip: comma
    return true;
  }

  /**
   * @private
   * @type {function}
   */
  function parseListComma() {

    /** @type {number} */
    var i;

    if ( isComma(DATA[$i]) ) {
      if (!COMMA) throw new Error( err('invalid list comma') );
      ++$i; // skip: comma
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

  /**
   * @private
   * @type {function}
   */
  function parseMapComma() {

    /** @type {number} */
    var i;

    if ( isComma(DATA[$i]) ) {
      if (!COMMA) throw new Error( err('invalid map comma') );
      ++$i; // skip: comma
    }
    // check: last value
    else if (COMMA) {

      // skip: line
      i = $i + 1;
      while ( !isLineBreak(DATA[i]) ) ++i;
      ++i; // skip: line break

      // skip: whitespace
      while ( isWhitespace(DATA[i]) ) ++i;

      if ( !isMapClose(DATA[i]) ) throw new Error( err('invalid map comma') );
    }
  }

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

  /**
   * @private
   * @type {function}
   */
  function parseNull() {
    $val = null;
  }

  /**
   * @private
   * @type {function}
   */
  function parseNumber() {
    if ( isInteger($val) ) return parseInteger();
    if ( isFloat($val)   ) return parseFloatNum();
    throw new Error( err('invalid number') );
  }

  /**
   * @private
   * @type {function}
   */
  function parseInteger() {
    $val = cutNumHelpers($val);
    $val = parseInt($val);
  }

  /**
   * @private
   * @type {function}
   */
  function parseFloatNum() {
    $val = cutNumHelpers($val);
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
          $i = i;
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
    if ( isNumber($val)  ) return parseNumber();

    parseString();
  }

  /**
   * @private
   * @type {function}
   */
  function parseNestedValue() {

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
    if ( isNumber($val)  ) return parseNumber();

    parseString();

    // backtrack and trim: comma
    if ( hasCommaEnd($val) ) {
      $val = slice.string($val, 0, -1);
      --$i; // backtrack: line break or hash mark
      while ( isWhitespace(DATA[$i]) ) --$i;
      --$i; // backtrack: comma
    }
  }


  init(config, data, file);
  return $map;
}
