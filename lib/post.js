#! /usr/local/bin/node

var argv = require('minimist')(process.argv.slice(2));
var swig  = require('swig');
var fs  = require('fs');
var moment = require('moment');

var collection = argv.type || "note";

var slug = argv.slug;

if (!slug) {
	console.error("You must supply a `--slug` argument for the new post's URL.");
	return;
}

var template = swig.compileFile(__dirname + '/prototype/' + collection + ".md");

var stamp = moment().format("YYYY-MM-DD");

var output = template({
	date: stamp
});

fs.mkdir(__dirname + "/../src/_posts/" + slug, function(err) {
	if (err) {
		console.error(err);
		return;
	}
	fs.writeFile(__dirname + "/../src/_posts/" + slug + "/draft.md", output);
})