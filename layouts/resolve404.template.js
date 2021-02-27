const URLS = $URLS;

const CATEGORIES = [
	'notes',
	'music',
	'clips',
	'articles',
	'portfolio',
	'ideas'
];

const SLUGS = {};


function parseURL(path) {
	const pieces = path.split(/\/+/g);

	let category = null;
	let slug = null;

	if (pieces.length >= 2 && CATEGORIES.indexOf(pieces[1]) !== -1) {
		category = pieces[1];
		if (pieces.length >= 3) {
			slug = pieces[2];
		}
	}

	return {
		path: path,
		category: category,
		slug: slug
	}
}

const PAGES = URLS.map(url => {

	url = new URL(url.toLowerCase()).pathname;

	let parsed = parseURL(url);

	if (parsed.slug) {
		SLUGS[parsed.slug] = url;
	}

	return parsed;
});

console.log(SLUGS);


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

const resolveURL = function(badURL) {

	badURL = new URL(badURL.toLowerCase()).pathname;

	if (badURL.slice(-4) !== "html") {
		badURL += "/index.html";
	}

	// first, see if adding `index.html` fixed it
	for (let c = 0; c < PAGES.length; c += 1) {
		let page = PAGES[c];

		if (page.path === badURL) {
			return {
				url: page.path,
				badURL: badURL,
				confidence: 10,
				type: "exact"
			}
		}
	}

	// then see if the category just changed
	let parsedBadURL = parseURL(badURL.toLowerCase());

	if (SLUGS[parsedBadURL.slug]) {
		return {
			url: SLUGS[parsedBadURL.slug],
			badURL: badURL,
			confidence: 8,
			type: "slug matches"
		}
	}

	// then try edit distance
	for (let c = 0; c < PAGES.length; c += 1) {
		let page = PAGES[c];

		let editDistance = getEditDistance(page.path, badURL);

		if (editDistance <= 2) {
			return {
				url: "https://mechanicalscribe.com" + page.path,
				badURL: badURL,
				confidence: 6,
				type: "editDistance",
				editDistance: editDistance
			}
		}
	}

	return null;
}

function runTests() {
	let tests = [
		'https://mechanicalscribe.com/notes/visualizing-rhapsody-in-blue',
		'https://mechanicalscribe.com/NOTES/visualizing-rhapsody-in-blue/index.html',
		'https://www.mechanicalscribe.com/clips/wikipedia-edits-republican-primary/index.html',
		'https://mechanicalscribe.com/about2.html',
		'https://mechanicalscribe.com'
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
	if (typeof window === 'undefined') {
		return;
	}

	let resolution = resolveURL(window.location.href);

	if (!resolution) {
		console.log("Couldn't resolve URL");
		return;
	}

	if (resolution.url === "https://mechanicalscribe.com/index.html") {
		resolution.url = "https://mechanicalscribe.com";
	}

	setTimeout(function() { 
		window.location.replace(resolution.url);
	}, 100);
}

redirectPage();