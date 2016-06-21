/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.2
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

/**
 * @private
 * @param {string} val
 * @return {boolean}
 */
var isFloat = (function _build_isFloat() {

  /**
   * @private
   * @type {!RegExp}
   * @const
   */
  var FLT = (function() {

    /** @type {string} */
    var whole;
    /** @type {string} */
    var part;
    /** @type {string} */
    var exp;
    /** @type {string} */
    var src;

    whole = '[+-]?[0-9]{1,3}(?:[_,]?[0-9]{3})*';
    part  = '(?:\\.(?:[0-9]{3}_?)*[0-9]{1,3})';
    exp   = '(?:[eE][+-]?[1-9][0-9]?[0-9]?(?:[_,]?[0-9]{3})*)';

    src = fuse.string('(?:', part, exp, '?)|(?:', part, '?', exp, ')');
    src = fuse.string('^', whole, '(?:', src, ')$');
    return to.regex(src);
  })();

  /**
   * @param {string} val
   * @return {boolean}
   */
  return function isFloat(val) {
    return has(val, FLT);
  };
})();
