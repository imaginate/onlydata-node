/**
 * -----------------------------------------------------------------------------
 * OnlyData
 * -----------------------------------------------------------------------------
 * @version 1.0.4
 * @see [OnlyData](http://onlydata.tech)
 *
 * @author Adam Smith <adam@imaginate.life> (https://imaginate.life)
 * @copyright 2017 Adam A Smith <adam@imaginate.life> (https://imaginate.life)
 *
 * @see [JSDoc3](http://usejsdoc.org)
 * @see [Closure Compiler JSDoc Syntax](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

/**
 * @private
 * @param {!Object} config
 * @param {string} data
 * @param {string=} file
 */
function init(config, data, file) {

  /** @type {string} */
  var cwd;

  file = file || '';

  if ( !is.obj(config) ) throw new TypeError('invalid type for `config` param');
  if ( !is.str(data)   ) throw new TypeError('invalid type for `data` param');
  if ( !is.str(file)   ) throw new TypeError('invalid type for `file` param');

  cwd = config['cwd'] || process.cwd();

  CONF = config;
  DATA = fuse.string(data, '\n');
  FILE = file && resolvePath(cwd, file);
  LEN  = DATA.length;
  DIR  = FILE
    ? getDirpath(FILE)
    : cwd;

  $line = 1;
  $map  = {};
  $i    = 0;

  if ( !isContentEmpty(data) ) run();
}
