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

suite('list tests', function() {


  suite('inline lists', function() {

    test('empty', function() {
      var map = onlydata('list = []');
      assert( is.array(map.list) );
      assert( is.empty(map.list) );
    });

    test('commas', function() {
      var content  = 'list1 = [ 1, 2, 3, ] \n';
          content += 'list2 = [ 1, 2, 3  ]   ';
      var map = onlydata(content);
      assert( is.array(map.list1) );
      assert( is.array(map.list2) );
      assert( map.list1[0] === 1 );
      assert( map.list1[1] === 2 );
      assert( map.list1[2] === 3 );
      assert( map.list2[0] === 1 );
      assert( map.list2[1] === 2 );
      assert( map.list2[2] === 3 );
      assert.throws(function() {
        onlydata('list = [ 1 2 3 ]');
      }, Error);
    });

    test('values', function() {
      var map = onlydata('list = [ "s", 5, true, null, ]');
      assert( is.array(map.list) );
      assert( map.list[0] === 's'  );
      assert( map.list[1] === 5    );
      assert( map.list[2] === true );
      assert( map.list[3] === null );
      assert.throws(function() {
        onlydata('list = [ {} ]');
      }, Error);
      assert.throws(function() {
        onlydata('list = [ [] ]');
      }, Error);
      assert.throws(function() {
        onlydata('list = [ import path/to/file.od ]');
      }, Error);
    });

  });


  suite('multi-line lists', function() {

    test('basic', function() {
      var content  = 'list = [ \n';
          content += '  1      \n';
          content += '  2      \n';
          content += '  3      \n';
          content += ']          ';
      var map = onlydata(content);
      assert( is.array(map.list) );
      assert( map.list[0] === 1 );
      assert( map.list[1] === 2 );
      assert( map.list[2] === 3 );
    });

    test('commas', function() {
      var content  = 'list1 = [ \n';
          content += '  1,      \n';
          content += '  2,      \n';
          content += '  3       \n';
          content += ']         \n';
          content += 'list2 = [ \n';
          content += '  1,      \n';
          content += '  2,      \n';
          content += '  3,      \n';
          content += ']           ';
      var map = onlydata(content);
      assert( is.array(map.list1) );
      assert( is.array(map.list2) );
      assert( map.list1[0] === 1 );
      assert( map.list1[1] === 2 );
      assert( map.list1[2] === 3 );
      assert( map.list2[0] === 1 );
      assert( map.list2[1] === 2 );
      assert( map.list2[2] === 3 );
      assert.throws(function() {
        var content  = 'list = [ \n';
            content += '  1      \n';
            content += '  2,     \n';
            content += '  3      \n';
            content += ']          ';
        onlydata(content);
      }, Error);
    });

    test('values', function() {
      var content  = 'list = [      \n';
          content += '  string      \n';
          content += '  1,000       \n';
          content += '  true        \n';
          content += '  null        \n';
          content += '  { key: 1, } \n';
          content += '  [ 1, 2, 3 ] \n';
          content += ']               ';
      var map = onlydata(content);
      assert( is.array(map.list) );
      assert( map.list[0] === 'string' );
      assert( map.list[1] === 1000     );
      assert( map.list[2] === true     );
      assert( map.list[3] === null     );
      assert( is.object(map.list[4]) );
      assert( map.list[4].key === 1  );
      assert( is.array(map.list[5]) );
      assert( map.list[5][0] === 1  );
      assert( map.list[5][1] === 2  );
      assert( map.list[5][2] === 3  );
      assert.throws(function() {
        var content  = 'list = [   \n';
            content += '  {        \n';
            content += '    num: 1 \n';
            content += '  }        \n';
            content += ']            ';
        onlydata(content);
      }, Error);
      assert.throws(function() {
        var content  = 'list = [ \n';
            content += '  [      \n';
            content += '    item \n';
            content += '  ]      \n';
            content += ']          ';
        onlydata(content);
      }, Error);
      assert.throws(function() {
        var content  = 'list = [   \n';
            content += '  <<       \n';
            content += '    string \n';
            content += '  >>       \n';
            content += ']            ';
        onlydata(content);
      }, Error);
    });

  });


});
