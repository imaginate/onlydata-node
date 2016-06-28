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

suite('boolean tests', function() {

  test('true', function() {
    var content  = 'bool1 = true \n';
        content += 'bool2 = yes    ';
    var map = onlydata(content);
    assert( map.bool1 === true );
    assert( map.bool2 === true );
  });

  test('false', function() {
    var content  = 'bool1 = false \n';
        content += 'bool2 = no      ';
    var map = onlydata(content);
    assert( map.bool1 === false );
    assert( map.bool2 === false );
  });

  test('upper-case', function() {
    var content  = 'bool1 = TRUE  \n';
        content += 'bool2 = True  \n';
        content += 'bool3 = YES   \n';
        content += 'bool4 = Yes   \n';
        content += 'bool5 = FALSE \n';
        content += 'bool6 = False \n';
        content += 'bool7 = NO    \n';
        content += 'bool8 = No      ';
    var map = onlydata(content);
    assert( map.bool1 === true );
    assert( map.bool2 === true );
    assert( map.bool3 === true );
    assert( map.bool4 === true );
    assert( map.bool5 === false );
    assert( map.bool6 === false );
    assert( map.bool7 === false );
    assert( map.bool8 === false );
  });

});
