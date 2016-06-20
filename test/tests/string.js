/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0-beta
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2016 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

suite('string tests', function() {


  suite('basic strings', function() {

    test('plain', function() {
      var map = onlydata('str = simple');
      assert( map.str === 'simple' );
    });

    test('apostrophe', function() {
      var map = onlydata("str = apostrophe's");
      assert( map.str === "apostrophe's" );
    });

    test('quotes', function() {
      var map = onlydata('str = easy "quote"');
      assert( map.str === 'easy "quote"' );
    });

    test('two strings', function() {
      var content  = 'str1 = simple\n';
          content += 'str2 = simple';
      var map = onlydata(content);
      assert( map.str1 === 'simple' );
      assert( map.str2 === 'simple' );
    });

  });


  suite('quoted strings', function() {

    test('plain (single quote)', function() {
      var map = onlydata("str = 'simple'");
      assert( map.str === 'simple' );
    });

    test('plain (double quote)', function() {
      var map = onlydata('str = "simple"');
      assert( map.str === 'simple' );
    });

    test('whitespace', function() {
      var map = onlydata("str = ' simple '");
      assert( map.str === ' simple ' );
    });

    test('backslash', function() {
      var map = onlydata("str = 'apostrophe\\'s'");
      assert( map.str === "apostrophe's" );
    });

    test('inside quotes', function() {
      var map = onlydata('str = \'easy "quote"\'');
      assert( map.str === 'easy "quote"' );
    });

    test('two lines', function() {
      var content  = 'str1 = "simple"\n';
          content += "str2 = 'simple'";
      var map = onlydata(content);
      assert( map.str1 === 'simple' );
      assert( map.str2 === 'simple' );
    });

    test('special chars', function() {
      var content  = 'str1 = "{}"\n';
          content += 'str2 = "[]"\n';
          content += 'str3 = "import"';
      var map = onlydata(content);
      assert( map.str1 === '{}' );
      assert( map.str2 === '[]' );
      assert( map.str3 === 'import' );
    });

  });

});
