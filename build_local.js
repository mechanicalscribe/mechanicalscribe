const Metalsmith = require('metalsmith');
const debug = require('debug');
const swig = require('jstransformer')(require('jstransformer-swig'))
const rimraf = require("rimraf");

const SOURCE_DIR="./src";
const BUILD_DIR="./build";

Metalsmith(__dirname)
	.metadata({
	    sitename: "Mechanical Scribe",
    	siteurl: "http://mechanicalscribe.com/",
	    description: "Infrequenct posts by Chris Wilson. This site does not use cookies."
  	})
  	.source(SOURCE_DIR)            // source directory
  	.destination('./build')     // destination directory
  	.clean(true)                // clean destination before	
	.use(require("metalsmith-ignore")([ ".DS_Store", "**/.DS_Store", "**/**.less" ]))
	.use(require("@metalsmith/drafts")())	
	.use(require("metalsmith-sass")({}))
	.use(require("./plugins/metalsmith-markdown/lib")({
		"directories": [".", "_posts"],
		"ignore": ["README.md"]
	}))
	.use(require("metalsmith-excerpts")({}))
	.use(require("metalsmith-collections")({
		"notes": {
			"sortBy": "date",
			"reverse": true,
			"landing_page_layout": "category"
		},
		"music": {
			"sortBy": "date",
			"reverse": true,
			"landing_page_layout": "category"
		}
	}))
	// .use(require("./plugins/metalsmith-versioned-posts")({
	// 	"directories": ["_posts"],
	// 	"override": false
	// }))
	.use(require("./plugins/metalsmith-permalinks/lib")({
		fileFilter: /_posts\/.*?\/draft/,
		customSlug: data => data.slug || data.path.split(/\//g)[1],
		"delete_after_moving": true,
		relative: false,
		linksets: [
			{
				match: { collection: 'notes' },
				pattern: ":collection/:slug",
				relative: true
			},
			{
				match: { collection: 'music' },
				pattern: ":collection/:slug",
				relative: true
			}
		]
	}))
	// .use(require("./plugins/metalsmith-mathjax")())
	.use(require("metalsmith-layouts")({
		"directory": "layouts/swig",
		"pattern": "*.html",
		"default": "index.swig"
	}))
	.build(function(err) {
		if (err) throw err;
		rimraf(BUILD_DIR + "/_posts", function() {
			console.log("Build complete");
		})
	});