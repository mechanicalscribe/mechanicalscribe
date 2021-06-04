Mechanical Scribe
=====

Mechanicalscribe.com is a static site hosted on S3 and build with metalsmith.

Clone: 

	git clone https://github.com/mechanicalscribe/mechanicalscribe.git && cd mechanicalscribe

Install:

	npm install

Build:

	node build.js

Preview:

	PORT=4433 serve build

Deploy:

	aws s3 sync build s3://mechanicalscribe.com --profile scribe

(Requires `sudo pip install awscli` one time)

New post (deprecated):

	node lib/newPost.js --collection=note --slug=url-of-my-new-post

Invalidate cache:

	aws cloudfront create-invalidation --profile scribe --distribution-id EF2VD0B3J24S8 --paths /error.html

Setting up URL Mapping:

	node build # gets sitemap
	node lib/getPermalinks.js