/**
 * -----------------------------------------------------------------------------
 * ACT TASK: build
 * -----------------------------------------------------------------------------
 * @file Use `$ act build` to access this file.
 * @version 1.0.4
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

////////////////////////////////////////////////////////////
// EXPORTS
////////////////////////////////////////////////////////////

exports['desc'] = 'build from source';
exports['method'] = build;

////////////////////////////////////////////////////////////
// HELPERS
////////////////////////////////////////////////////////////

var vitals = require('node-vitals')('base', 'fs');
var copy   = vitals.copy;
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var is     = vitals.is;
var remap  = vitals.remap;
var roll   = vitals.roll;
var same   = vitals.same;
var slice  = vitals.slice;
var to     = vitals.to;

var log = require('log-ocd')();

var path = require('path');
var dirname = path.dirname;
var resolve = path.resolve;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

// project root directory - absolute path
var ROOT = resolve(__dirname, '..');

// define main project files - absolute path
var SRC  = resolve(ROOT, 'src/.frame.js');
var DEST = resolve(ROOT, 'dist/onlydata.js');

// match inserts - regexp
var INSERT = /^([ \t\v]*\/\/)[ \t\v]*INSERT[ \t\v]+(\S+\.js)[ \t\v]*$/mg;

// match special insert file patterns - regexp
var FRAME = /\/\.frame\.js$/;
var FILES = /\/\*\.js$/;

// match intro file comments - regexp
var INTRO = /^[\s\S]+?\n[ \t\v]*\*\/[ \t\v]*\n\n/;

// match every line - regexp
var LINES = /^[ \t\v]*\S[ \t\v\S]*$/mg;

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @type {function}
 */
function build() {

  /** @type {string} */
  var content;

  content = buildFrame(SRC);
  to.file(content, DEST);
  log.pass('Completed `build` task');
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} frame
 * @return {string}
 */
function buildFrame(frame) {

  /** @type {string} */
  var content;
  /** @type {string} */
  var base;

  base    = dirname(frame);
  content = getContent(frame);
  return insert(base, content);
}

/**
 * @private
 * @param {string} base
 * @param {string} content
 * @return {string}
 */
function insert(base, content) {

  /** @type {!RegExp} */
  var regex;

  regex = copy(INSERT); // avoid lastIndex errors
  return remap(content, regex, function(line, space, path) {
    path  = resolve(base, path);
    space = slice(space, 0, -2); // trim: slashes
    return isFrame(path)
      ? insertFrame(path, space)
      : isFiles(path)
        ? insertFiles(path, space)
        : insertFile(path, space);
  });
}

/**
 * @private
 * @param {string} frame
 * @param {string} space
 * @return {string}
 */
function insertFrame(frame, space) {

  /** @type {string} */
  var content;

  if ( !is.file(frame) ) throw new Error( fuse('invalid insert filepath - `', frame, '`') );

  content = buildFrame(frame);
  content = cut(content, INTRO);
  return indent(content, space);
}

/**
 * @private
 * @param {string} file
 * @param {string} space
 * @return {string}
 */
function insertFile(file, space) {

  /** @type {string} */
  var content;

  if ( !is.file(file) ) throw new Error( fuse('invalid insert filepath - `', file, '`') );

  content = getContent(file);
  content = cut(content, INTRO);
  return indent(content, space);
}

/**
 * @private
 * @param {string} path
 * @param {string} space
 * @return {string}
 */
function insertFiles(path, space) {

  /** @type {string} */
  var content;
  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var dir;

  dir = dirname(path);

  if ( !is.dir(dir) ) throw new Error( fuse('invalid insert dirpath - `', path, '`') );

  files = get.filepaths(dir, {
    basepath:  true,
    recursive: false,
    validExts: 'js'
  });
  content = roll.up('', files, function(file) {
    content = insertFile(file, space);
    return fuse(content, '\n');
  });
  return slice(content, 0, -1); // trim: last line break
}

/**
 * @private
 * @param {string} content
 * @param {string} space
 * @return {string}
 */
function indent(content, space) {
  space = space && fuse(space, '$&');
  return space
    ? remap(content, LINES, space)
    : content;
}

/**
 * @private
 * @param {string} file
 * @return {string}
 */
function getContent(file) {
  return get.file(file, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
}

/**
 * @private
 * @param {string} file
 * @return {boolean}
 */
function isFrame(content) {
  return has(content, FRAME);
}

/**
 * @private
 * @param {string} file
 * @return {boolean}
 */
function isFiles(content) {
  return has(content, FILES);
}
