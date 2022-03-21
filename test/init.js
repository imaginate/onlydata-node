/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @file Initializes the tests. Use `$ npm test` to access this file.
 * @version 1.0.4
 * @see [OnlyData](https://github.com/imaginate/onlydata)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

var vitals = require('node-vitals')('base', 'fs');
var each = vitals.each;
var fuse = vitals.fuse;
var get  = vitals.get;

var cd = process.chdir;
var log = require('log-ocd')();
var Mocha = require('mocha');
var resolve = require('path').resolve;

log.error.setConfig({
  'throw': false,
  'exit':  true
});

buildDist();
setTests();
runTests();

/**
 * @type {function}
 */
function buildDist() {

  /** @type {function} */
  var build;
  /** @type {string} */
  var path;

  path = resolve(__dirname, '../act/build.js');
  build = require(path).method;
  try {
    build();
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = fuse('Internal `build` ', err.name);
    log.error(err);
  }
}

/**
 * @type {function}
 */
function setTests() {

  /** @type {string} */
  var base;
  /** @type {string} */
  var path;

  base = __dirname;

  cd(base);

  path = resolve(base, 'setup/helpers.js');
  require(path);

  path = resolve(base, 'setup/interface.js');
  require(path);

  path = resolve(base, 'setup/reporters.js');
  require(path);
}

/**
 * @type {function}
 */
function runTests() {

  /** @type {!Mocha} */
  var mocha;
  /** @type {!Array} */
  var tests;
  /** @type {string} */
  var path;

  log.debug('Starting `onlydata` tests');

  mocha = new Mocha();
  mocha.reporter('specky');
  mocha.ui('onlydata');

  path = resolve(__dirname, 'tests');
  tests = get.filepaths(path, {
    basepath:  true,
    recursive: true,
    validExts: 'js'
  });
  each(tests, function(file) {
    mocha.addFile(file);
  });

  try {
    mocha.run(function() {
      log.pass('Completed `onlydata` tests');
    });
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = fuse('Internal `test` ', err.name);
    log.error(err);
  }
}
