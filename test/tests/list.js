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


});
