/**
 * -----------------------------------------------------------------------------
 * ACT TASK: version
 * -----------------------------------------------------------------------------
 * @file Use `$ act version` to access this file.
 * @version 1.0.2
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

var log = require('log-ocd')();

var path = require('path');
var resolve = path.resolve;

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

var ROOT = resolve(__dirname, '..');

var VERSION = {
  'SEMANTIC': /^[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?$/,
  'DEFAULT': /\b(v?)[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?\b/g,
  'CONFIG': /("version": ")[0-9]+\.[0-9]+\.[0-9]+(?:-[a-z]+\.?[0-9]*)?/,
  'BADGE': /(badge\/npm-)[0-9]+\.[0-9]+\.[0-9]+(?:--[a-z]+\.?[0-9]*)?/
};

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

  if ( !isSemantic(version) ) throw new Error('invalid `version` value (must be semantic version)');

  files = get.filepaths(ROOT, {
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

  file = resolve(ROOT, 'package.json');
  insertConfig(file, version);

  file = resolve(ROOT, 'README.md');
  insertBadge(file, version);

  log.pass('Completed `version` task');
}

////////////////////////////////////////////////////////////
// PRIVATE METHODS
////////////////////////////////////////////////////////////

/**
 * @private
 * @param {string} version
 * @return {boolean}
 */
function isSemantic(version) {
  return !!version && has(version, VERSION.SEMANTIC);
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
  content = remap(content, VERSION.DEFAULT, version);
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
  content = remap(content, VERSION.CONFIG, version);
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
  content = remap(content, VERSION.BADGE, version);
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
