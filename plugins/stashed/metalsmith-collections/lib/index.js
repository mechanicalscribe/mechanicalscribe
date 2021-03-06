var debug = require('debug')('metalsmith-collections');
var multimatch = require('multimatch');
var unique = require('uniq');
var loadMetadata = require('read-metadata').sync;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin that adds `collections` of files to the global
 * metadata as a sorted array.
 *
 * @param {Object} collections (optional)
 * @return {Function}
 */

function plugin(opts) {
  opts = normalize(opts);
  var keys = Object.keys(opts);
  var match = matcher(opts);

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    /**
     * Clear collections (to prevent multiple additions of the same file)
     */

    keys.forEach(function(key) {
      metadata[key] = [];
    });

    /**
     * Clear collections (to prevent multiple additions of the same file when running via metalsmith-browser-sync)
     */

    keys.forEach(function(key) {
      metadata[key] = [];
    });

    /**
     * Find the files in each collection.
     */

    Object.keys(files).forEach(function(file) {
      var data = files[file];

      data.path = data.path || file;

      const matches = match(file, data);
      if (matches.length) {
        debug('processing file: %s', file);

        matches.forEach(function(key) {
          if (key && keys.indexOf(key) < 0) {
            opts[key] = {};
            keys.push(key);
          }

          metadata[key] = metadata[key] || [];
          // Check if the user supplied a filter function. If so, pass the file metadata to it and
          // only add files that pass the filter test.
          if (typeof opts[key].filterBy == 'function') {
            var filterFunc = opts[key].filterBy;
            if (filterFunc(data)) {
              metadata[key].push(data);
            }
          } else {
            // If no filter function is provided, add every file to the collection.
            metadata[key].push(data);
          }
        });
      }
    });

    /**
     * Ensure that a default empty collection exists.
     */

    keys.forEach(function(key) {
      metadata[key] = metadata[key] || [];
    });

    /**
     * Sort the collections.
     */

    keys.forEach(function(key) {
      debug('sorting collection: %s', key);
      var settings = opts[key];
      var sort = settings.sortBy || 'date';
      var col = metadata[key];

      if ('function' == typeof sort) {
        col.sort(sort);
      } else {
        col.sort(function(a, b) {
          a = a[sort];
          b = b[sort];
          if (!a && !b) return 0;
          if (!a) return -1;
          if (!b) return 1;
          if (b > a) return -1;
          if (a > b) return 1;
          return 0;
        });
      }

      if (settings.reverse) col.reverse();
    });

    /**
     * Add `next` and `previous` references and apply the `limit` option
     */

    keys.forEach(function(key) {
      debug('referencing collection: %s', key);
      var settings = opts[key];
      var col = metadata[key];
      var last = col.length - 1;
      if (opts[key].limit && opts[key].limit < col.length) {
        col = metadata[key] = col.slice(0, opts[key].limit);
        last = opts[key].limit - 1;
      }
      if (settings.refer === false) return;
      col.forEach(function(file, i) {
        if (0 != i) file.previous = col[i - 1];
        if (last != i) file.next = col[i + 1];
      });
    });

    /**
     * Add collection metadata
     */

    keys.forEach(function(key) {
      debug('adding metadata: %s', key);
      var settings = opts[key];
      var col = metadata[key];
      col.metadata =
        typeof settings.metadata === 'string'
          ? loadMetadata(settings.metadata)
          : settings.metadata;
    });

    /**
      Add landing pages
    */

    keys.forEach(function(key){
      var settings = opts[key];
      var col = metadata[key];
      if (settings.landing_page_layout) {
        if (files[key + "/index.html"]) {
          debug ("Can't create landing page for collection '%s' since a file at '%s/index.html' already exists.", key, key);
          return;
        }
        files[key + "/index.html"] = {
          layout: settings.landing_page_layout,
          collection: col,
          contents: ""
        }
        debug ("Added landing page for collection '%s' at '%s/index.html'", key, key);
      }
    });

    /**
     * Add them grouped together to the global metadata.
     */

    metadata.collections = {};
    keys.forEach(function(key) {
      return (metadata.collections[key] = metadata[key]);
    });

    done();
  };
}

/**
 * Normalize an `options` dictionary.
 *
 * @param {Object} options
 */

function normalize(options) {
  options = options || {};

  for (var key in options) {
    var val = options[key];
    if ('string' == typeof val) options[key] = { pattern: val };
    if (val instanceof Array) options[key] = { pattern: val };
  }

  return options;
}

/**
 * Generate a matching function for a given set of `collections`.
 *
 * @param {Object} collections
 * @return {Function}
 */

function matcher(cols) {
  var keys = Object.keys(cols);
  var matchers = {};

  keys.forEach(function(key) {
    var opts = cols[key];
    if (!opts.pattern) {
      return;
    }
    matchers[key] = {
      match: function(file) {
        return multimatch(file, opts.pattern);
      }
    };
  });

  return function(file, data) {
    var matches = [];

    if (data.collection) {
      var collection = data.collection;
      if (!Array.isArray(collection)) {
        collection = [collection];
      }
      collection.forEach(function(key) {
        matches.push(key);

        if (key && keys.indexOf(key) < 0) {
          debug('adding new collection through metadata: %s', key);
        }
      });
    }

    for (var key in matchers) {
      var m = matchers[key];
      if (m.match(file).length) {
        matches.push(key);
      }
    }

    data.collection = unique(matches);
    return data.collection;
  };
}
