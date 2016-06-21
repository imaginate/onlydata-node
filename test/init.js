/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @file Initializes the tests. Use `$ npm test` to access this file.
 * @version 1.0.0-beta.3
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
var each = vitals.each;
var fuse = vitals.fuse;
var get  = vitals.get;

var log = require('log-ocd')();
var Mocha = require('mocha');
var resolvePath = require('path').resolve;

log.error.setConfig({
  'throw': false,
  'exit':  true
});

require('./setup');
runTests();

/**
 * @type {function}
 */
function runTests() {

  /** @type {!Mocha} */
  var mocha;
  /** @type {!Array} */
  var tests;
  /** @type {string} */
  var dir;

  log.debug('Starting `onlydata` tests');

  mocha = new Mocha();
  mocha.reporter('specky');
  mocha.ui('onlydata');

  dir = resolvePath('test/tests');
  tests = get.filepaths(dir, {
    basepath: true,
    validExts: 'js'
  });
  each(tests, function(file) {
    mocha.addFile(file);
  });

  try {
    mocha.run(function() {
      log.pass('Finished `onlydata` tests');
    });
  }
  catch (err) {
    err.name = err.name || 'Error';
    err.name = fuse('Internal `test` ', err.name);
    log.error(err);
  }
}
