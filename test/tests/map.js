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


  suite('multi-line maps', function() {

    test('basic', function() {
      var content  = 'map = {   \n';
          content += '  key1: 1 \n';
          content += '  key2: 2 \n';
          content += '  key3: 3 \n';
          content += '}           ';
      var map = onlydata(content);
      assert( is.object(map.map) );
      assert( map.map.key1 === 1 );
      assert( map.map.key2 === 2 );
      assert( map.map.key3 === 3 );
    });

    test('commas', function() {
      var content  = 'map1 = {   \n';
          content += '  key1: 1, \n';
          content += '  key2: 2, \n';
          content += '  key3: 3  \n';
          content += '}          \n';
          content += 'map2 = {   \n';
          content += '  key1: 1, \n';
          content += '  key2: 2, \n';
          content += '  key3: 3, \n';
          content += '}            ';
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
        var content  = 'map = {    \n';
            content += '  key1: 1  \n';
            content += '  key2: 2, \n';
            content += '  key3: 3  \n';
            content += '}            ';
        onlydata(content);
      }, Error);
    });

    test('values', function() {
      var content  = 'map = {             \n';
          content += '  str:  string      \n';
          content += '  num:  1,000       \n';
          content += '  bool: true        \n';
          content += '  nil:  null        \n';
          content += '  map:  { key: 1, } \n';
          content += '  list: [ 1, 2, 3 ] \n';
          content += '}                     ';
      var map = onlydata(content);
      assert( is.object(map.map) );
      assert( map.map.str  === 'string' );
      assert( map.map.num  === 1000     );
      assert( map.map.bool === true     );
      assert( map.map.nil  === null     );
      assert( is.object(map.map.map) );
      assert( is.array(map.map.list) );
      assert( map.map.map.key === 1 );
      assert( map.map.list[0] === 1 );
      assert( map.map.list[1] === 2 );
      assert( map.map.list[2] === 3 );
      assert.throws(function() {
        var content  = 'map = {    \n';
            content += '  map: {   \n';
            content += '    num: 1 \n';
            content += '  }        \n';
            content += '}            ';
        onlydata(content);
      }, Error);
      assert.throws(function() {
        var content  = 'map = {   \n';
            content += '  list: [ \n';
            content += '    item  \n';
            content += '  ]       \n';
            content += '}           ';
        onlydata(content);
      }, Error);
      assert.throws(function() {
        var content  = 'map = {    \n';
            content += '  str: <<  \n';
            content += '    string \n';
            content += '  >>       \n';
            content += '}            ';
        onlydata(content);
      }, Error);
    });

  });


});
