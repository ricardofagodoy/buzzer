var http = require('http'),
    serveHtml = require('./serveHtml');
    
http.createServer(function(req, res) {
 //   res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(serveHtml(req.url));
}).listen(5000);