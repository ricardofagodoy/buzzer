var http = require('http'),
    serveHtml = require('./serveHtml');
    
http.createServer(function(req, res) {
    
    var header = {'Content-Type': 'text/html'},
        data = serveHtml(req.url, header);
        
    res.writeHead(200, header);
    res.end(data);
}).listen(5000);