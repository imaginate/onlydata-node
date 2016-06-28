/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.2
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

suite('null tests', function() {

  test('lower-case', function() {
    var content  = 'nil1 = null \n';
        content += 'nil2 = nil    ';
    var map = onlydata(content);
    assert( map.nil1 === null );
    assert( map.nil2 === null );
  });

  test('upper-case', function() {
    var content  = 'nil1 = NULL \n';
        content += 'nil2 = Null \n';
        content += 'nil3 = NIL  \n';
        content += 'nil4 = Nil    ';
    var map = onlydata(content);
    assert( map.nil1 === null );
    assert( map.nil2 === null );
    assert( map.nil3 === null );
    assert( map.nil4 === null );
  });

});
