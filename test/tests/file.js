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

suite('file tests', function() {

  // note: the current working directory is set to "onlydata-node/test/"
  //       or if relative to this page "../"

  test('group', function() {
    var map = onlydata('data/group.od');
    assert( is.object(map.group) );
    assert( is.object(map.group.map)     );
    assert( is.object(map.group.list)    );
    assert( is.object(map.group.null)    );
    assert( is.object(map.group.number)  );
    assert( is.object(map.group.string)  );
    assert( is.object(map.group.boolean) );
  });

});
