const fs = require('fs');

module.exports = generateRedirect = function(url_list) {
	const jsTemplate = fs.readFileSync("./layouts/resolve404.template.js", "utf-8");

	let jsFile = jsTemplate.replace("$URLS", `${ JSON.stringify(url_list) }`)

	return jsFile;

	// fs.writeFileSync("./src/js/resolve404.js", jsFile); 
	// fs.writeFileSync("./build/js/resolve404.js", jsFile); 

}