/**
 * -----------------------------------------------------------------------------
 * ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ act version` to access this file.
 * @version 1.0.1
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

exports['desc'] = 'updates version for the repo';
exports['value'] = 'x.x.x-pre.x';
exports['method'] = update;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

var SEMANTIC = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/;
var ALL_VERSION = /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g;
var CONF_VERSION = /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/;
var BADGE_VERSION = /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/;

////////////////////////////////////////////////////////////
// EXTERNAL HELPERS
////////////////////////////////////////////////////////////

var vitals = require('node-vitals')('base', 'fs');
var each   = vitals.each;
var fuse   = vitals.fuse;
var get    = vitals.get;
var has    = vitals.has;
var is     = vitals.is;
var remap  = vitals.remap;
var to     = vitals.to;

var PATH = require('path');
var resolvePath = PATH.resolve;

////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////

/**
 * @public
 * @param {string} version
 */
function update(version) {

  /** @type {!Array<string>} */
  var files;
  /** @type {string} */
  var file;
  /** @type {string} */
  var dir;

  if ( !isSemVersion(version) ) throw new Error('invalid value (must be a semantic version)');

  dir = resolvePath('.');
  files = get.filepaths(dir, {
    basepath:  true,
    recursive: true,
    validExts: 'js',
    invalidDirs: [
      'node_modules',
      '.git',
      'tmp'
    ]
  });
  each(files, function(file) {
    insertVersion(file, version);
  });

  file = resolvePath('package.json');
  insertConfig(file, version);

  file = resolvePath('README.md');
  insertBadge(file, version);
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemVersion(version) {
  return !!version && has(version, SEMANTIC);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertVersion(filepath, version) {

  /** @type {string} */
  var content;

  content = getContent(filepath);
  version = fuse('$1', version);
  content = remap(content, ALL_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertConfig(filepath, version) {

  /** @type {string} */
  var content;

  content = getContent(filepath);
  version = fuse('$1', version);
  content = remap(content, CONF_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} filepath
 * @param {string} version
 */
function insertBadge(filepath, version) {

  /** @type {string} */
  var content;

  content = getContent(filepath);
  version = remap(version, /-/, '--'); // dashes must be doubled for badge
  version = fuse('$1', version);
  content = remap(content, BADGE_VERSION, version);
  to.file(content, filepath);
}

/**
 * @private
 * @param {string} filepath
 * @return {string}
 */
function getContent(filepath) {
  return get.file(filepath, {
    'buffer':   false,
    'encoding': 'utf8',
    'eol':      'LF'
  });
}
