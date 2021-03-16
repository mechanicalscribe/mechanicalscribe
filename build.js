const Metalsmith = require('metalsmith');
const debug = require('debug');
const swig = require('jstransformer')(require('jstransformer-swig'))
const rimraf = require("rimraf");

const SOURCE_DIR="./src";
const BUILD_DIR="./build";

const SITEMAP_OVERRIDES = require("./sitemap_overrides.json");

const CATEGORIES = [
	'notes',
	'music',
	'clips',
	'articles',
	'portfolio',
	'archive',
	'ideas',
	'coding'
];

// THIRD-PARTY LIBRARIES
const MS = {
	IGNORE: require("metalsmith-ignore"),
	DRAFTS: require("@metalsmith/drafts"),
	SASS: require("metalsmith-sass"),
	EXCERPTS: require("metalsmith-excerpts"),
	// COLLECTIONS: require("metalsmith-collections"),
	LAYOUTS: require("metalsmith-layouts")
}

// FORKED PLUGINS
const FORKED = {
	MARKDOWN: require("./plugins/metalsmith-markdown/lib"),
	PERMALINKS: require("./plugins/metalsmith-permalinks/lib"),
	MATHJAX: require("./plugins/metalsmith-mathjax"),
	SITEMAP: require("./plugins/metalsmith-mapsite"),
	COLLECTIONS: require("./plugins/metalsmith-collections")	
}

// Original Plugins
const ORIGINAL = {
	VERSIONED: require("./plugins/metalsmith-versioned-posts")
}

Metalsmith(__dirname)
	.metadata({
		sitename: "Mechanical Scribe",
		siteurl: "http://mechanicalscribe.com/",
		description: "Infrequenct posts by Chris Wilson. This site does not use cookies."
  	})
  	.source(SOURCE_DIR)			// source directory
  	.destination('./build')		// destination directory
  	.clean(true)				// clean destination before	
	.use(MS.IGNORE([ ".DS_Store", "**/.DS_Store", "**/**.less" ]))
	.use(MS.DRAFTS())
	.use(MS.SASS({}))
	.use(ORIGINAL.VERSIONED({
		"directories": ["_posts"],
		"override": false
	}))
	.use(FORKED.COLLECTIONS({
		generic: 'posts',
		filter: /_posts\/.*draft.md/,
		sortBy: 'date',
		reverse: true,
		landing_page_layout: "collection.swig"
	}))
	.use(FORKED.MARKDOWN({
		"directories": [".", "_posts"],
		"ignore": ["README.md"]
	}))
	.use(MS.EXCERPTS({}))
	.use(FORKED.PERMALINKS({
		fileFilter: /_posts\/.*?\/draft/,
		ignoreFilter: /_posts\/(_drafts)\/.*/, // can be an array
		customSlug: data => data.slug || data.path.split(/\//g)[2],
		"delete_after_moving": true,
		relative: false,
		linksets: [
			{
				match: { collection: CATEGORIES.join("|") },
				pattern: ":collection/:slug",
				relative: true
			}
		]
	}))
	.use(FORKED.MATHJAX())
	.use(MS.LAYOUTS({
		"directory": "layouts/swig",
		"pattern": [ "*.html", "**/*.html" ],
		"default": "index.swig"
	}))
	.use(FORKED.SITEMAP({
		hostname: 'https://mechanicalscribe.com',
		pattern: [ "*.html", "*/*.html", "*/*/*.html" ],
		omitPattern: [ "demos/**", "canopybirds/**" ],
		page_types: {
			default: {
				priority: 0.64,
				changefreq: 'yearly'
			},
			landing_page: {
				priority: 0.64,
				changefreq: 'weekly'				
			},
			music: {
				priority: 0.7,
				changefreq: 'monthly'
			}
		},
		overrides: SITEMAP_OVERRIDES,
		lastmod: true,
		beautify: false
	}))
	.build(function(err) {
		if (err) throw err;
		rimraf(BUILD_DIR + "/_posts", function() {
			console.log("Build complete");
		});
	});