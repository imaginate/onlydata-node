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

suite('map tests', function() {


  suite('inline maps', function() {

    test('empty', function() {
      var map = onlydata('map = {}');
      assert( is.object(map.map) );
      assert( is.empty(map.map)  );
    });

    test('commas', function() {
      var content  = 'map1 = { key1: 1, key2: 2, key3: 3, } \n';
          content += 'map2 = { key1: 1, key2: 2, key3: 3  }   ';
      var map = onlydata(content);
      assert( is.object(map.map1) );
      assert( is.object(map.map2) );
      assert( map.map1.key1 === 1 );
      assert( map.map1.key2 === 2 );
      assert( map.map1.key3 === 3 );
      assert( map.map2.key1 === 1 );
      assert( map.map2.key2 === 2 );
      assert( map.map2.key3 === 3 );
      assert.throws(function() {
        onlydata('map = { key1: 1 key2: 2 key3: 3 }');
      }, Error);
    });

    test('values', function() {
      var map = onlydata('map = { str: "string", num: 5, bool: true, nil: null, }');
      assert( is.object(map.map) );
      assert( map.map.str  === 'string' );
      assert( map.map.num  === 5        );
      assert( map.map.bool === true     );
      assert( map.map.nil  === null     );
      assert.throws(function() {
        onlydata('map = { map: {} }');
      }, Error);
      assert.throws(function() {
        onlydata('map = { list: [] }');
      }, Error);
      assert.throws(function() {
        onlydata('map = { data: import path/to/file.od }');
      }, Error);
    });

  });


});
