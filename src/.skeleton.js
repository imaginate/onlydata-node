/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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

// INSERT ./helpers/*.js

module.exports = newOnlyData();