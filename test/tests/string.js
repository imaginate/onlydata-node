/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.0
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

    test('backslash', function() {
      var map = onlydata('str = every\\slash/stays\\');
      assert( map.str === 'every\\slash/stays\\' );
    });

    test('comment', function() {
      var map = onlydata('str = simple # comment');
      assert( map.str === 'simple' );
    });

    test('two strings', function() {
      var content  = 'str1 = simple \n';
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

    test('comment', function() {
      var map = onlydata("str = 'simple # keep' # trim");
      assert( map.str === 'simple # keep' );
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
      var content  = 'str1 = "simple" \n';
          content += "str2 = 'simple'";
      var map = onlydata(content);
      assert( map.str1 === 'simple' );
      assert( map.str2 === 'simple' );
    });

    test('special chars', function() {
      var content  = 'str1 = "{}" \n';
          content += 'str2 = "[]" \n';
          content += 'str3 = "import"';
      var map = onlydata(content);
      assert( map.str1 === '{}' );
      assert( map.str2 === '[]' );
      assert( map.str3 === 'import' );
    });

  });


  suite('string blocks', function() {

    test('plain', function() {
      var content  = 'str = <<      \n';
          content += '<p>simple</p> \n';
          content += '>>';
      var map = onlydata(content);
      assert( map.str === '<p>simple</p>' );
    });

    test('trim', function() {
      var content  = 'str = <<          \n';
          content += '\t<div>           \n';
          content += '    <p>simple</p> \n';
          content += '\v</div>          \n';
          content += ' >>';
      var map = onlydata(content);
      assert( map.str === '<div><p>simple</p></div>' );
    });

    test('space', function() {
      var content  = 'str = <<               \n';
          content += ' <p>keep mid space</p> \n';
          content += '>>';
      var map = onlydata(content);
      assert( map.str === '<p>keep mid space</p>' );
    });

    test('comment', function() {
      var content  = 'str = <<        \n';
          content += ' # trim         \n';
          content += '<p>comments</p> \n';
          content += '>>';
      var map = onlydata(content);
      assert( map.str === '<p>comments</p>' );
    });

    test('backslash', function() {
      var content  = 'str = <<                \n';
          content += '\\ <div>                \n';
          content += '\\  <p>mid\\slash\\</p> \n';
          content += '\\ </div>               \n';
          content += '\\ >>                   \n';
          content += '\\>>                    \n';
          content += '>>';
      var map = onlydata(content);
      assert( map.str === ' <div>  <p>mid\\slash\\</p> </div> >>>>' );
    });

  });


  suite('raw string blocks', function() {

    test('plain', function() {
      var content  = 'str = <<<      \n';
          content += '<p>simple</p>  \n';
          content += '>>>';
      var map = onlydata(content);
      assert( map.str === '<p>simple</p>  ' );
    });

    test('trim', function() {
      var content  = 'str = <<<         \n';
          content += '\t<div>           \n';
          content += '    <p>simple</p> \n';
          content += '\v</div>          \n';
          content += ' >>> ';
      var map = onlydata(content);
      var result  = '\t<div>           \n';
          result += '    <p>simple</p> \n';
          result += '\v</div>          ';
      assert( map.str === result );
    });

    test('space', function() {
      var content  = 'str = <<<              \n';
          content += ' <p>keep all space</p> \n';
          content += '>>>';
      var map = onlydata(content);
      assert( map.str === ' <p>keep all space</p> ' );
    });

    test('comment', function() {
      var content  = 'str = <<<       \n';
          content += ' # keep         \n';
          content += '<p>comments</p> \n';
          content += '>>>';
      var map = onlydata(content);
      var result  = ' # keep         \n';
          result += '<p>comments</p> ';
      assert( map.str === result );
    });

    test('backslash', function() {
      var content  = 'str = <<<           \n';
          content += '\\ <p>\\slash\\</p> \n';
          content += '>>>';
      var map = onlydata(content);
      assert( map.str === '\\ <p>\\slash\\</p> ' );
    });

  });


});
