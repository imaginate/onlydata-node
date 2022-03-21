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

suite('import tests', function() {

  // note: the current working directory is set to "onlydata-node/test/"
  //       or if relative to this page "../"

  test('empty', function() {
    var content  = 'map1 = import data/empty.od    \n';
        content += 'map2 = import data/empty.only  \n';
        content += 'map3 = import data/empty.onlydata';
    var map = onlydata(content);
    assert( is.object(map.map1) );
    assert( is.empty(map.map1)  );
    assert( is.object(map.map2) );
    assert( is.empty(map.map2)  );
    assert( is.object(map.map3) );
    assert( is.empty(map.map3)  );
  });

  test('base', function() {
    var onlydata = global.onlydata.construct();
    onlydata.setConfig('import-paths', {
      base: 'data/base/'
    });
    var map = onlydata('map = import @base/pass.od');
    assert( is.object(map.map) );
    assert( map.map.pass === true );
  });

  test('group', function() {
    var map = onlydata('group = import data/group/*.od');
    assert( is.object(map.group) );
    assert( is.object(map.group.map)     );
    assert( is.object(map.group.list)    );
    assert( is.object(map.group.null)    );
    assert( is.object(map.group.number)  );
    assert( is.object(map.group.string)  );
    assert( is.object(map.group.boolean) );
  });

});
