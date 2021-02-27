const fs = require('fs');
const parseString = require('xml2js').parseString;

const jsTemplate = fs.readFileSync("./layouts/resolve404.template.js", "utf-8");

const xml = fs.readFileSync('./build/sitemap.xml', 'utf-8');

let urls = {};

let url_list = [];

parseString(xml, function (err, result) {
	result.urlset.url.forEach(u => {
		url_list.push(u.loc[0]);

		urls[u.loc] = {
			priority: u.priority[0],
			changefreq: u.changefreq[0]
		}
	});

	fs.writeFileSync(__dirname + '/urls.json', JSON.stringify(urls, null, 2));

	let jsFile = jsTemplate.replace("$URLS", `${ JSON.stringify(url_list) }`)

	fs.writeFileSync("./src/js/resolve404.js", jsFile); 



});