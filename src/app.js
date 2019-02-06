const restify = require('restify');
const httpHandler = require('./http-handler');

// Initialize server
const server = restify.createServer();


// Enable plugins
server.use(restify.plugins.queryParser());


// Register handlers
server.get('/', httpHandler.resizeImage);


// Start server
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});