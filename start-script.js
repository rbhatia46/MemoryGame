var connect = require('connect');
var serveStatic = require('serve-static');
var servePort = 8080;
connect().use(serveStatic(__dirname, { 'index': './index.html' })).listen(servePort, function () {
  console.log('Server running on ' + servePort + '...');
});