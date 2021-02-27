const handler = require('serve-handler');
const http = require('http');

const handleServer = async (request, response) => {
	await handler(request, response, {
		public: "build"
	});
};


const server = http.createServer((request, response) => {
	// You pass two more arguments for config and middleware
	// More details here: https://github.com/vercel/serve-handler#options
	return handleServer(request, response);
})
 
server.listen(3000, () => {
	console.log('Running at http://localhost:3000');
});