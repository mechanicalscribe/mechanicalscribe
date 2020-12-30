
var consolidate = require('consolidate');
var debug = require('debug')('metalsmith-templates');
var each = require('async').each;
var extend = require('extend');
var path = require('path');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to run files through any template in a template `dir`.
 *
 * @param {String or Object} options
 *   @property {String} engine
 *   @property {String} directory (optional)
 * @return {Function}
 */

function plugin(opts){
  if ('string' == typeof opts) opts = { engine: opts };
  opts = opts || {};
  var engine = opts.engine;
  var dir = opts.directory || 'templates';

  if (!opts.engine) throw new Error('"engine" option required');

  return function(files, metalsmith, done){
    debug(files);
    var metadata = metalsmith.metadata();

    each(Object.keys(files), convert, done);

    function convert(file, done){
      debug('checking file: %s', file);
      // debug(metadata[file]);
      var data = files[file];
      if (!data.layout) return done();

      debug('converting file: %s', file);
      data.contents = data.contents.toString();
      var tmpl = path.join(dir, data.layout + ".html");
      var clone = extend({}, metadata, data);
      //console.log(clone);

      consolidate[engine](tmpl, clone, function(err, str){
        if (err) return done(err);
        data.contents = new Buffer.from(str);
        debug('converted file: %s', file);
        //console.log(str);
        done();
      });
    }
  };
}