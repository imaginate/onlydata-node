/**
 * -----------------------------------------------------------------------------
 * ACT TASK: build
 * -----------------------------------------------------------------------------
 * @file Use `$ act build` to access this file.
 * @version 1.0.0
 *
 * @author Adam Smith <adam@imaginate.life> (https://github.com/imaginate)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://github.com/imaginate)
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
// CONSTANTS
////////////////////////////////////////////////////////////

var FRAME = '.skeleton.js';
var SRC   = 'src';

var OUT    = /^[ \t\v]*\/\/[ \t\v]*OUT[ \t\v]+(\S+\.js)[ \t\v]*$/mg;
var INSERT = /^([ \t\v]*\/\/)[ \t\v]*INSERT[ \t\v]+(\S+\.js)[ \t\v]*$/mg;
var INTRO  = /^[\s\S]+\n[ \t\v]*\*\/[ \t\v]*\n/;
var LINE   = /^[ \t\v]*\S[ \t\v\S]*$/mg;

////////////////////////////////////////////////////////////
// EXTERNAL HELPERS
////////////////////////////////////////////////////////////

var vitals = require('node-vitals')('base', 'fs');
var cut    = vitals.cut;
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var is     = vitals.is;
var remap  = vitals.remap;
var slice  = vitals.slice;
var to     = vitals.to;

var PATH = require('path');
var getDirpath  = PATH.dirname;
var resolvePath = PATH.resolve;

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @type {function}
 */
function build() {

  /** @type {!Array<string>} */
  var frames;
  /** @type {string} */
  var src;

  src = resolvePath(SRC);
  frames = get.filepaths(src, {
    basepath:   true,
    recursive:  true,
    validFiles: FRAME
  });
  frames = frames.reverse();
  each(frames, buildFrame);
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} frame
 */
function buildFrame(frame) {

  /** @type {string} */
  var content;
  /** @type {string} */
  var basedir;
  /** @type {string} */
  var out;

  basedir = getDirpath(frame);
  content = get.file(frame, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
  out = getOut(basedir, content);
  content = cut(content, OUT);
  content = insert(basedir, content);
  to.file(content, out);
}

/**
 * @private
 * @param {string} basedir
 * @param {string} content
 * @return {string}
 */
function getOut(basedir, content) {

  /** @type {!Array<string>} */
  var outs;
  /** @type {string} */
  var out;

  outs = get.values(content, OUT);

  if (!outs.length) throw new Error('missing out file');
  if (outs.length > 1) throw new Error('multiple out files');

  out = outs[0];
  out = remap(out, OUT, '$1');
  return resolvePath(basedir, out);
}

/**
 * @private
 * @param {string} basedir
 * @param {string} content
 * @return {string}
 */
function insert(basedir, content) {
  return remap(content, INSERT, function(line, space, file) {
    space = slice(space, 0, -2); // trim: slashes
    file = resolvePath(basedir, file);
    return getInsert(file, space);
  });
}

/**
 * @private
 * @param {string} file
 * @param {string} space
 * @return {string}
 */
function getInsert(file, space) {

  /** @type {string} */
  var content;

  if ( !is.file(file) ) throw new Error( fuse('invalid insert filepath - `', file, '`') );

  content = get.file(file, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
  content = cut(content, INTRO);
  return indent(content, space);
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
    ? remap(content, LINE, space)
    : content;
}
