/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
 * @see [OnlyData](https://github.com/imaginate/onlydata)
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
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
