/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta.1
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

suite('number tests', function() {


  suite('integers', function() {

    test('plain', function() {
      var map = onlydata('num = 1');
      assert( map.num === 1 );
    });

    test('positive', function() {
      var map = onlydata('num = +1');
      assert( map.num === 1 );
    });

    test('negative', function() {
      var map = onlydata('num = -1');
      assert( map.num === -1 );
    });

    test('commas', function() {
      var map = onlydata('num = 1,000,000');
      assert( map.num === 1000000 );
      assert.throws(function() {
        onlydata('num = 1,0,0,0');
      }, Error);
    });

    test('underscores', function() {
      var map = onlydata('num = 1_000_000');
      assert( map.num === 1000000 );
      assert.throws(function() {
        onlydata('num = 1_0_0_0');
      }, Error);
    });

    test('comment', function() {
      var map = onlydata('num = 1000 # comment');
      assert( map.num === 1000 );
    });

    test('two integers', function() {
      var content  = 'num1 = 1,000 \n';
          content += 'num2 = 2_000';
      var map = onlydata(content);
      assert( map.num1 === 1000 );
      assert( map.num2 === 2000 );
    });

  });


});
