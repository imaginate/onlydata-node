/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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

// INSERT ./helpers/*.js
// INSERT ./config/*.js
// INSERT ./parse/.frame.js
// INSERT ./constructor.js

module.exports = newOnlyData();
