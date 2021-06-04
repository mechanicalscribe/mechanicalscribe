const URLS = $URLS;

const SLUGS = {};

function parseURL(path) {
	let pieces = path.split(/\/+/g);
	pieces = pieces.filter(d => d !== "");

	let category = null;
	let slug = null;

	if (pieces.length === 3) {
		category = pieces[0];
		slug = pieces[1];
	}

	return {
		path: path,
		category: category,
		slug: slug
	}
}

const PAGES = URLS.map(d => new URL(d.toLowerCase()).pathname)

const PARSED = PAGES.map(d => {
	let parsed = parseURL(d)

	if (parsed.slug) {
		SLUGS[parsed.slug] = d;
	}

	return parsed;
});

// https://gist.github.com/andrei-m/982927
const getEditDistance = function(a, b) {
	if (a.length === 0) return b.length; 
	if (b.length === 0) return a.length; 

	const matrix = [];

	// increment along the first column of each row
	let i;
	for(i = 0; i <= b.length; i++){
		matrix[i] = [i];
	}

	// increment each column in the first row
	let j;
	for(j = 0; j <= a.length; j++){
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for(i = 1; i <= b.length; i++){
		for(j = 1; j <= a.length; j++){
			if (b.charAt(i-1) == a.charAt(j-1)) {
				matrix[i][j] = matrix[i-1][j-1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i-1][j-1] + 1, // substitution
					Math.min(matrix[i][j-1] + 1, // insertion
					matrix[i-1][j] + 1) // deletion
				); 
			}
		}
	}
	return matrix[b.length][a.length];
};

const resolveURL = function(originalURL) {

	let badURL = new URL(originalURL.toLowerCase()).pathname;



	// first, see if it's missing `.html` and whether that fixes it
	let testURL = (badURL + ".html").replace("/.", ".");

	let index = PAGES.indexOf(testURL);

	if (index !== -1) {
		return {
			url: PAGES[index],
			badURL: originalURL,
			confidence: 10,
			type: "missing .html"
		}			
	}

	// then see if it's missing `index.html` and whether that fixes it
	if (badURL.slice(-4) !== "html") {
		badURL += "/index.html";
		badURL = badURL.replace("//", "/");
		index = PAGES.indexOf(badURL);
		if (index !== -1) {
			return {
				url: PAGES[index],
				badURL: originalURL,
				confidence: 10,
				type: "missing index.html"
			}			
		}
	}

	// then see if the category just changed
	let parsedBadURL = parseURL(badURL.toLowerCase());

	if (SLUGS[parsedBadURL.slug]) {
		return {
			url: SLUGS[parsedBadURL.slug],
			badURL: originalURL,
			confidence: 8,
			type: "slug matches"
		}		
	}

	// then try edit distance
	for (let c = 0; c < PAGES.length; c += 1) {
		let page = PAGES[c];

		let editDistance = getEditDistance(page, badURL);

		if (editDistance <= 2) {
			return {
				url: page,
				badURL: originalURL,
				confidence: 6,
				type: "edit distance",
				editDistance: editDistance
			}
		}
	}

	return null;
}

function runTests() {
	let tests = [
		'https://mechanicalscribe.com/notes/visualizing-rhapsody-in-blue',
		'https://mechanicalscribe.com/coding/fix-dropbox-conflicts-automatically/',
		'https://mechanicalscribe.com/NOTES/visualizing-rhapsody-in-blue/index.html',
		'https://www.mechanicalscribe.com/clips/wikipedia-edits-republican-primary/index.html',
		'https://localhost:4433/coding2/fix-dropbox-conflicts-automatically/index.html',
		'https://mechanicalscribe.com/about2.html',
		'https://mechanicalscribe.com',
		'https://mechanicalscribe.com/index.html',
		'https://mechanicalscribe.com/index2.html'
	];

	tests.forEach(test => {
		let resolution = resolveURL(test);

		if (resolution) {
			console.log("Resolved bad path:", resolution)
		} else {
			console.log("Couldn't resolve", test);
		}

	});
}

const redirectPage = function() {
	let article = document.querySelector("article");
	article.style.display = "none";

	if (typeof window === 'undefined') {
		return;
	}

	let resolution = resolveURL(window.location.href);

	if (!resolution) {
		console.log("Couldn't resolve URL", window.location.href);
		article.style.display = "block";
		return;
	}

	resolution.url = window.origin + resolution.url;

	if (resolution.url === "https://mechanicalscribe.com/index.html") {
		resolution.url = "https://mechanicalscribe.com";
	}

	setTimeout(function() { 
		window.location.replace(resolution.url + "#redirect");
	}, 100);
}

// runTests();

document.addEventListener("DOMContentLoaded", function() {
	redirectPage();
});