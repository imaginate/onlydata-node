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


  suite('floats', function() {

    test('decimal', function() {
      var map = onlydata('num = 0.5');
      assert( map.num === 0.5 );
    });

    test('exponent', function() {
      var map = onlydata('num = 1e5');
      assert( map.num === 1e5 );
      var content  = 'num1 = 1e5 \n';
          content += 'num2 = 1E5   ';
      var map = onlydata(content);
      assert( map.num1 === 1e5 );
      assert( map.num2 === 1e5 );
    });

    test('positive', function() {
      var content  = 'num1 = +0.5 \n';
          content += 'num2 = 1e+5   ';
      var map = onlydata(content);
      assert( map.num1 === 0.5 );
      assert( map.num2 === 1e5 );
    });

    test('negative', function() {
      var content  = 'num1 = -0.5 \n';
          content += 'num2 = 1e-5   ';
      var map = onlydata(content);
      assert( map.num1 === -0.5 );
      assert( map.num2 === 1e-5 );
    });

    test('commas', function() {
      var content  = 'num1 = 1,000,000.5 \n';
          content += 'num2 = 1e5,000       ';
      var map = onlydata(content);
      assert( map.num1 === 1000000.5 );
      assert( map.num2 === 1e5000    );
      assert.throws(function() {
        onlydata('num = 0.000,5');
      }, Error);
      assert.throws(function() {
        onlydata('num = 1e234,5');
      }, Error);
    });

    test('underscores', function() {
      var content  = 'num1 = 1_000_000.5 \n';
          content += 'num2 = 1.234_5     \n';
          content += 'num3 = 1e5_000       ';
      var map = onlydata(content);
      assert( map.num1 === 1000000.5 );
      assert( map.num2 === 1.2345    );
      assert( map.num3 === 1e5000    );
      assert.throws(function() {
        onlydata('num = 0.0_005');
      }, Error);
      assert.throws(function() {
        onlydata('num = 1e2_3_4_5');
      }, Error);
    });

    test('complex', function() {
      var map = onlydata('num = 1,000.000_5e6');
      assert( map.num === 1000.0005e6 );
    });

    test('comment', function() {
      var map = onlydata('num = 1,000.000_5e6 # comment');
      assert( map.num === 1000.0005e6 );
    });

  });


});
