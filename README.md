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

	pushd build; python -m SimpleHTTPServer 8080; popd

Deploy:

	aws s3 sync site s3://mechanicalscribe.com --profile scribe

(Requires `sudo pip install awscli` one time)

New post:

	node lib/post.js --type=note --slug=url-of-my-new-post