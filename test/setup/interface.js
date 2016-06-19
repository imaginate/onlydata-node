/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * Copyright Notice:
 * The below code is a modified version of the Mocha [bdd interface](https://github.com/mochajs/mocha/blob/master/lib/interfaces/bdd.js).
 * @copyright 2016 TJ Holowaychuk <tj@vision-media.ca>
 */

'use strict';

var Mocha = require('mocha');
var Suite = Mocha.Suite;
var Test = Mocha.Test;

Mocha.interfaces['onlydata'] = Interface;

module.exports = Interface;

/**
 * Custom interface example:
 *
 *      suite('title', function() {
 *        test('details', function() {
 *          assert(...);
 *        });
 *      });
 *
 * @param {Suite} suite - The root suite.
 */
function Interface(suite) {

  /** @type {!Array<Suite>} */
  var suites;

  suites = [ suite ];

  suite.on('pre-require', function(context, file, mocha) {

    /**
     * Defines a suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = Suite.create(suites[0], msg);
      suite.file = file;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines a skipped suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite.skip = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = Suite.create(suites[0], msg);
      suite.pending = true;

      suites.unshift(suite);
      tests.call(suite);
      suites.shift();

      return suite;
    };

    /**
     * Defines the only not skipped suite of tests.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Suite}
     */
    context.suite.only = function(msg, tests) {

      /** @type {Suite} */
      var suite;

      suite = context.suite(msg, tests);
      mocha.grep( suite.fullTitle() );
      return suite;
    };

    /**
     * Defines a test.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Test}
     */
    context.test = function(msg, tests) {

      /** @type {Suite} */
      var suite;
      /** @type {Test} */
      var test;

      suite = suites[0];
      tests = suite.pending ? null : tests;
      test  = new Test(msg, tests);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Defines a skipped test.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Test}
     */
    context.test.skip = function(msg, tests) {
      return context.test(msg, null);
    };

    /**
     * Defines the only not skipped test.
     *
     * @public
     * @param {string} msg
     * @param {function} tests
     * @return {Test}
     */
    context.test.only = function(msg, tests) {

      /** @type {Test} */
      var test;

      test = context.test(msg, tests);
      mocha.grep( test.fullTitle() );
      return test;
    };

    /**
     * Execute before running tests.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.before = function(name, fn) {
      suites[0].beforeAll(name, fn);
    };

    /**
     * Execute after running tests.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.after = function(name, fn) {
      suites[0].afterAll(name, fn);
    };

    /**
     * Execute before each test case.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.beforeEach = function(name, fn) {
      suites[0].beforeEach(name, fn);
    };

    /**
     * Execute after each test case.
     *
     * @public
     * @param {string} name
     * @param {function} fn
     */
    context.afterEach = function(name, fn) {
      suites[0].afterEach(name, fn);
    };
  });
};
