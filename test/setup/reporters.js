/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 */

var resolve = require('path').resolve;
var reporters = require('mocha').reporters;

var path = resolve(__dirname, 'reporters/specky.js');
reporters.specky = require(path);
