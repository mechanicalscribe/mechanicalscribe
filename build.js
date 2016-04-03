var Metalsmith = require('metalsmith');

Metalsmith(__dirname)
	.use(require("metalsmith-ignore")([ "**/.DS_Store" ]))
	.use(require("metalsmith-drafts")({}))
	.use(require("metalsmith-less")({}))
	.use(require("metalsmith-versioned-posts")({
		"directories": ["_posts"],
		"override": false
	}))
	.use(require("metalsmith-markdown")({
		"directories": [".", "_posts"],
		"ignore": ["README.md"]
	}))
	.use(require("metalsmith-excerpts")({}))
	.use(require("metalsmith-permalinks")({
		"pattern": "/:collection/:slug",
		"delete_after_moving": true
	}))
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
	.use(require("metalsmith-templates")({
		"engine": "swig",
		"directory": "layouts"
	}))
	.build(function(err) {
		if (err) throw err;
	});