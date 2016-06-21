/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.2
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var copy   = vitals.copy;
var cut    = vitals.cut;
var each   = vitals.each;
var fill   = vitals.fill;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var is     = vitals.is;
var remap  = vitals.remap;
var roll   = vitals.roll;
var same   = vitals.same;
var slice  = vitals.slice;
var to     = vitals.to;
var until  = vitals.until;

var PATH = require('path');
var getBasename = PATH.basename;
var getExtname  = PATH.extname;
var getDirpath  = PATH.dirname;
var resolvePath = PATH.resolve;

/**
 * @private
 * @param {string} num
 * @return {string}
 */
var cutNumHelpers = (function _build_cutNumHelpers() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /[,_]/g;

  /**
   * @param {string} num
   * @return {string}
   */
  return function cutNumHelpers(num) {
    REGEX.lastIndex = 0;
    return cut(num, REGEX);
  };
})();

/**
 * @private
 * @param {string} str
 * @return {boolean}
 */
var hasCommaEnd = (function _build_hasCommaEnd() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var END = /,$/;

  /**
   * @param {string} str
   * @return {boolean}
   */
  return function hasCommaEnd(str) {
    return has(str, END);
  };
})();

/**
 * @private
 * @param {string} file
 * @return {boolean}
 */
var hasOnlyDataExt = (function _build_hasOnlyDataExt() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EXT = /\.(?:od|only|onlydata)$/i;

  /**
   * @param {string} file
   * @return {boolean}
   */
  return function hasOnlyDataExt(file) {
    return has(file, EXT);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isAtSign = (function _build_isAtSign() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var SIGN = '@';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isAtSign(ch) {
    return same(ch, SIGN);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isBackslash = (function _build_isBackslash() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var BACK = '\\';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isBackslash(ch) {
    return same(ch, BACK);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isBoolean = (function _build_isBoolean() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var BOOL = /^(?:true|false|yes|no)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isBoolean(val) {
    return has(val, BOOL);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isColon = (function _build_isColon() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var COLON = ':';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isColon(ch) {
    return same(ch, COLON);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isComma = (function _build_isComma() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var COMMA = ',';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isComma(ch) {
    return same(ch, COMMA);
  };
})();

/**
 * @private
 * @param {string} content
 * @return {boolean}
 */
var isContentEmpty = (function _build_isContentEmpty() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var EMPTY = /^\s+$/;

  /**
   * @param {string} content
   * @return {boolean}
   */
  return function isContentEmpty(content) {
    return !content || has(content, EMPTY);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isEqualSign = (function _build_isEqualSign() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var EQ = '=';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isEqualSign(ch) {
    return same(ch, EQ);
  };
})();

/**
 * @private
 * @param {string} path
 * @return {boolean}
 */
var isFiles = (function _build_isFiles() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var REGEX = /^(?:.*[\\/])?\*\.(?:od|only|onlydata)$/i;

  /**
   * @param {string} path
   * @return {boolean}
   */
  return function isFiles(path) {
    return has(path, REGEX);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFloat = (function _build_isFloat() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var FLT = (function() {

    /** @type {string} */
    var whole;
    /** @type {string} */
    var part;
    /** @type {string} */
    var exp;
    /** @type {string} */
    var src;

    whole = '[+-]?[0-9]{1,3}(?:[_,]?[0-9]{3})*';
    part  = '(?:\\.(?:[0-9]{3}_?)*[0-9]{1,3})';
    exp   = '(?:[eE][+-]?[1-9][0-9]?[0-9]?(?:[_,]?[0-9]{3})*)';

    src = fuse.string('(?:', part, exp, '?)|(?:', part, '?', exp, ')');
    src = fuse.string('^', whole, '(?:', src, ')$');
    return to.regex(src);
  })();

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isFloat(val) {
    return has(val, FLT);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isHashMark = (function _build_isHashMark() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var HASH = '#';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isHashMark(ch) {
    return same(ch, HASH);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isImport = (function _build_isImport() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var KEY = /^import$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isImport(val) {
    return has(val, KEY);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isInteger = (function _build_isInteger() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var INT = /^[+-]?[1-9][0-9]?[0-9]?(?:[_,]?[0-9]{3})*$/;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isInteger(val) {
    return has(val, INT);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isKeyChar = (function _build_isKeyChar() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CHARS = (function() {

    /** @type {string} */
    var special;
    /** @type {string} */
    var numeric;
    /** @type {string} */
    var lower;
    /** @type {string} */
    var upper;
    /** @type {string} */
    var chars;

    special = '_-';
    numeric = '0123456789';
    lower   = 'abcdefghijklmnopqrstuvwxyz';
    upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    chars = fuse.string(special, numeric, lower, upper);
    return newCharMap(chars);
  })();

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isKeyChar(ch) {
    return has(CHARS, ch);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isLessSign = (function _build_isLessSign() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var SIGN = '<';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isLessSign(ch) {
    return same(ch, SIGN);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isLineBreak = (function _build_isLineBreak() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var LF = '\n';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isLineBreak(ch) {
    return same(ch, LF);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isListClose = (function _build_isListClose() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var CLOSE = ']';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isListClose(ch) {
    return same(ch, CLOSE);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isListOpen = (function _build_isListOpen() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var OPEN = '[';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isListOpen(ch) {
    return same(ch, OPEN);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isMapClose = (function _build_isMapClose() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var CLOSE = '}';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isMapClose(ch) {
    return same(ch, CLOSE);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isMapOpen = (function _build_isMapOpen() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var OPEN = '{';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isMapOpen(ch) {
    return same(ch, OPEN);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isMoreSign = (function _build_isMoreSign() {

  /**
   * @private
   * @type {string}
   * @const
   */
  var SIGN = '>';

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isMoreSign(ch) {
    return same(ch, SIGN);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isNull = (function _build_isNull() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var NULL = /^(?:null|nil)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isNull(val) {
    return has(val, NULL);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isNumber = (function _build_isNumber() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var NUM = /[+-]?[0-9][0-9_,]*(?:\.[0-9][0-9_]*)?(?:[eE][+-]?[0-9][0-9_,]*)?/;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isNumber(val) {
    return has(val, NUM);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isOpenKeyChar = (function _build_isOpenKeyChar() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CHARS = (function() {

    /** @type {string} */
    var special;
    /** @type {string} */
    var lower;
    /** @type {string} */
    var upper;
    /** @type {string} */
    var chars;

    special = '_';
    lower   = 'abcdefghijklmnopqrstuvwxyz';
    upper   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    chars = fuse.string(special, lower, upper);
    return newCharMap(chars);
  })();

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isOpenKeyChar(ch) {
    return has(CHARS, ch);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isQuoteMark = (function _build_isQuoteMark() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var QUOTES = {
    '"': true,
    "'": true
  };

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isQuoteMark(ch) {
    return has(QUOTES, ch);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isSlash = (function _build_isSlash() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var SLASH = {
    '/':  true,
    '\\': true
  };

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isSlash(ch) {
    return has(SLASH, ch);
  };
})();

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isTrue = (function _build_isTrue() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var TRUE = /^(?:true|yes)$/i;

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isTrue(val) {
    return has(val, TRUE);
  };
})();

/**
 * @private
 * @param {string} ch - one character
 * @return {boolean}
 */
var isWhitespace = (function _build_isWhitespace() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var SPACE = newCharMap(' \t\v');

  /**
   * @param {string} ch
   * @return {boolean}
   */
  return function isWhitespace(ch) {
    return has(SPACE, ch);
  };
})();

/**
 * @private
 * @param {string} chars
 * @return {!Object}
 */
function newCharMap(chars) {

  /** @type {!Object} */
  var map;
  /** @type {number} */
  var len;
  /** @type {string} */
  var ch;
  /** @type {number} */
  var i;

  map = {};
  len = chars.length;
  i = -1;
  while (++i < len) {
    ch = chars[i];
    map[ch] = true;
  }
  return map;
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
function normalizeEol(content) {
  return remap(content, /\r\n?/g, '\n');
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var trimEndWhitespace = (function _build_trimEndWhitespace() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var SPACE = /[ \t\v]+$/;

  /**
   * @param {string} content
   * @return {string}
   */
  return function trimEndWhitespace(content) {
    return cut(content, SPACE);
  };
})();

/**
 * @private
 * @param {string} content
 * @return {string}
 */
var trimWhitespace = (function _build_trimWhitespace() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var A = /^[ \t\v]+/;

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var Z = /[ \t\v]+$/;

  /**
   * @param {string} content
   * @return {string}
   */
  return function trimWhitespace(content) {
    content = cut(content, A);
    return cut(content, Z);
  };
})();

/**
 * @private
 * @type {!Object<string, function(*): boolean>}
 * @const
 */
var CONF_TYPES = {
  'import-paths': function(val) {
    return is('stringMap', val);
  }
};

/**
 * @private
 * @type {!Object<string, *>}
 * @const
 */
var CONF_VALUES = {
  'import-paths': {}
};

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
      i = $i;
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
      i = $i;
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

/**
 * The OnlyData constructor.
 *
 * @public
 * @return {!Function{
 *   parse:       function,
 *   parseString: function,
 *   parseBuffer: function,
 *   parseFile:   function,
 *   getConfig:   function,
 *   setConfig:   function,
 *   resetConfig: function
 * }}
 */
var newOnlyData = (function _build_newOnlyData() {

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var ERR_MSG = {
    'content': 'invalid type for `content` param',
    'file': {
      'type': 'invalid type for `file` param',
      'path': 'invalid filepath for `file` param',
      'ext':  'invalid file extension for `file` param'
    }
  };

  /**
   * @private
   * @type {!Object}
   * @const
   */
  var CONF_ERR_MSG = {
    'get': {
      'type': 'invalid type for `prop` param',
      'key':  'invalid `prop` param (must be a config key name)'
    },
    'set': {
      'key':  'invalid `prop` param (must be a config key name)',
      'val':  'invalid type for `val` param',
      'type': 'invalid type for `props` param',
      'keys': 'invalid prop key in `props` obj (must be config key names)',
      'vals': 'invalid type for a prop value in `props` obj'
    },
    'reset': {
      'type': 'invalid type for `prop` param',
      'key':  'invalid `prop` param (must be a config key name)'
    }
  };

  /**
   * The OnlyData constructor.
   *
   * @public
   * @return {!Function<string, function>}
   */
  function newOnlyData() {

    /** @type {!Function} */
    var onlydata;
    /** @type {!Object} */
    var config;
    /** @type {string} */
    var CWD;

    // set: current working directory
    CWD = process.cwd();

    // make: new config instance
    config = copy(CONF_VALUES);

    // make: new onlydata instance
    onlydata = function parseOnlyDataBase(content) {
      return parseOnlyData(content);
    };

    // parse methods
    onlydata.parse       = parseOnlyData;
    onlydata.parseString = parseOnlyDataString;
    onlydata.parseBuffer = parseOnlyDataBuffer;
    onlydata.parseFile   = parseOnlyDataFile;

    // config methods
    onlydata.getConfig   = function getOnlyDataConfig(prop) {
      switch (arguments.length) {
        case 0: return getConfig();
        case 1: return is.array(prop)
          ? getConfigProps(prop)
          : getConfigProp(prop);
      }
      return getConfigProps(arguments);
    };
    onlydata.setConfig   = function setOnlyDataConfig(prop, val) {
      return is.string(prop)
        ? setConfigProp(prop, val)
        : setConfigProps(prop);
    };
    onlydata.resetConfig = function resetOnlyDataConfig(prop) {
      switch (arguments.length) {
        case 0: return resetConfig();
        case 1: return is.array(prop)
          ? resetConfigProps(prop)
          : resetConfigProp(prop);
      }
      return resetConfigProps(arguments);
    };

    // constructor
    onlydata.construct   = newOnlyData;
    onlydata.constructor = newOnlyData;

    return onlydata;

    /**
     * Parses OnlyData content into an object.
     *
     * @public
     * @param {(string|!Buffer)} content - Must be a string (or buffered string)
     *   of OnlyData or a valid OnlyData filepath.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyData(content) {

      if ( is.buffer(content) ) return parseOnlyDataBuffer(content);

      if ( !is.string(content) ) throw new TypeError(ERR_MSG.content);

      return is.file(content)
        ? parseOnlyDataFile(content)
        : parseOnlyDataString(content);
    }

    /**
     * Parses a string of OnlyData content into an object.
     *
     * @public
     * @param {string} content - Must be a string of OnlyData.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataString(content) {

      if ( !is.string(content) ) throw new TypeError(ERR_MSG.content);

      prepImportPaths();
      content = normalizeEol(content);
      return parse(config, content);
    }

    /**
     * Parses a string of OnlyData content into an object.
     *
     * @public
     * @param {!Buffer} content - Must be a buffered string of OnlyData.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataBuffer(content) {

      if ( !is.buffer(content) ) throw new TypeError(ERR_MSG.content);

      prepImportPaths();
      content = to.string(content);
      content = normalizeEol(content);
      return parse(config, content);
    }

    /**
     * Parses an OnlyData file into an object.
     *
     * @public
     * @param {string} file - Must be a valid OnlyData filepath.
     * @return {!Object} - The parsed map.
     */
    function parseOnlyDataFile(file) {

      /** @type {string} */
      var content;

      if ( !is.string(file) ) throw new TypeError(ERR_MSG.file.type);
      if ( !is.file(file)   ) throw new Error(ERR_MSG.file.path);
      if ( !hasOnlyDataExt(file) ) throw new Error(ERR_MSG.file.ext);

      prepImportPaths();
      content = get.file(file, {
        'buffer':   false,
        'encoding': 'utf8',
        'eol':      'LF'
      });
      return parse(config, content, file);
    }

    /**
     * Gets a copy of all configuration properties for an OnlyData instance.
     *
     * @public
     * @return {!Object} - A clone of the OnlyData instance's config.
     */
    function getConfig() {
      return copy.object(config, true);
    }

    /**
     * Gets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     * @return {*} - The value of the OnlyData instance's config property.
     */
    function getConfigProp(prop) {

      if ( !is.string(prop) ) throw new TypeError(CONF_ERR_MSG.get.type);
      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.get.key);

      return copy(config[prop], true);
    }

    /**
     * Gets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {(!Array<string>|!Arguments<string>)} props - The OnlyData config
     *   property key names to get.
     * @return {!Object} - A clone of the config property values.
     */
    function getConfigProps(props) {

      /** @type {!Object} */
      var result;

      result = {};
      each(props, function(prop) {
        result[prop] = getConfigProp(prop);
      });
      return result;
    }

    /**
     * Sets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     * @param {*} val - The new config property value.
     */
    function setConfigProp(prop, val) {

      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.set.key);
      if ( !CONF_TYPES[prop](val) ) throw new TypeError(CONF_ERR_MSG.set.val);

      config[prop] = val;
    }

    /**
     * Sets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {!Object} props - The new values for OnlyData config properties.
     */
    function setConfigProps(props) {

      if ( !is.object(props) ) throw new TypeError(CONF_ERR_MSG.set.type);

      each(props, function(val, prop) {
        if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.set.keys);
        if ( !CONF_TYPES[prop](val) ) throw new TypeError(CONF_ERR_MSG.set.vals);

        config[prop] = val;
      });
    }

    /**
     * Resets all configuration properties for an OnlyData instance.
     *
     * @public
     * @type {function}
     */
    function resetConfig() {
      config = fuse(config, CONF_VALUES);
    }

    /**
     * Resets a configuration property for an OnlyData instance.
     *
     * @public
     * @param {string} prop - A valid OnlyData config property key name.
     */
    function resetConfigProp(prop) {

      if ( !is.string(prop) ) throw new TypeError(CONF_ERR_MSG.reset.type);
      if ( !has(CONF_TYPES, prop) ) throw new Error(CONF_ERR_MSG.reset.key);

      config[prop] = CONF_VALUES[prop];
    }

    /**
     * Resets configuration properties for an OnlyData instance.
     *
     * @public
     * @param {(!Array<string>|!Arguments<string>)} props - The OnlyData config
     *   property key names to reset.
     */
    function resetConfigProps(props) {
      each(props, resetConfigProp);
    }

    /**
     * @private
     * @type {function}
     */
    function prepImportPaths() {
      config['import-paths'] = remap.obj(config['import-paths'], function(path) {
        path = resolvePath(CWD, path);
        if ( !is.dir(path) ) throw new Error( err('invalid import-paths dirpath') );
        return path;
      });
    }
  }

  return newOnlyData;
})();


module.exports = newOnlyData();
