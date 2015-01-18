Mechanical Scribe
=====

Mechanicalscribe.com is a static site hosted on S3 and build with metalsmith.

Clone: 

	git clone https://github.com/mechanicalscribe/mechanicalscribe.git && cd mechanicalscribe

Install:

	npm install

Build:

	./node_modules/metalsmith/bin/metalsmith

Deploy:

	aws s3 sync site s3://mechanicalscribe.com
