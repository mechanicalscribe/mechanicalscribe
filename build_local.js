var Metalsmith = require('metalsmith');
var debug = require('debug');

Metalsmith(__dirname)
	.use(require("metalsmith-less")({}))
	.use(require("metalsmith-ignore")([ "**/.**", "**/**.less" ]))
	.use(require("../metalsmith-publish/lib")({
		directories: ["_posts"],
      	articles: {
        	draft: false,
        	private: false,
        	future: false
      	}				
	}))
	.use(require("../metalsmith-versioned-posts")({
		"directories": ["_posts"],
		"override": false
	}))
	.use(require("../metalsmith-markdown/lib")({
		"directories": [".", "_posts"],
		"ignore": ["README.md"]
	}))
	.use(require("metalsmith-excerpts")({}))
	.use(require("../metalsmith-permalinks/lib")({
		"directories": ["_posts"],
		"pattern": ":collection/:slug",
		"delete_after_moving": true
	}))
	.use(require("../metalsmith-mathjax")())
	.use(require("../metalsmith-collections/lib")({
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
	.use(require("metalsmith-templates")({
		"engine": "swig",
		"directory": "layouts"
	}))
	.build(function(err) {
		if (err) throw err;
	});