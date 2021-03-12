#! /usr/local/bin/node

const argv = require('minimist')(process.argv.slice(2));
const swig  = require('swig');
const fs  = require('fs');
const moment = require('moment');

const collection = argv.type || "note";

const slug = argv.slug;

if (!slug) {
	console.error("You must supply a `--slug` argument for the new post's URL.");
	return;
}

const template = swig.compileFile(__dirname + '/prototype/' + collection + ".md");

const stamp = moment().format("YYYY-MM-DD");

const output = template({
	date: stamp
});

fs.mkdir(__dirname + "/../src/_posts/" + slug, function(err) {
	if (err) {
		console.error(err);
		return;
	}
	fs.writeFileSync(__dirname + "/../src/_posts/" + slug + "/draft.md", output);
})