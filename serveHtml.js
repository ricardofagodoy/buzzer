var fs = require('fs'),
    pathLib = require('path'),
    cache = {
        404: "<h3>Sorry!</h3>Page not found!"
    },
    contentPath = __dirname + '/contents',
    cacheable = false;

module.exports = function(path, ctype) {
        
    switch(path) {
        case '/': 
        case '/index':
            path = '/index.html';
        break;
    }
    
    if(ctype) {
        var fext = pathLib.extname(path);

        switch (fext) {
            case '.js':
                ctype['Content-Type'] = 'text/javascript';
                break;
            case '.css':
                ctype['Content-Type'] = 'text/css';
                break;
            case '.json':
                ctype['Content-Type'] = 'application/json';
                break;
            case '.png':
                ctype['Content-Type'] = 'image/png';
                break;      
        }
    }
    
    return getPage(path);
};

var loadPage = function(path) {
    
    console.log('Loading page ' + path + ' from system file...');
    
    try {
        var data = fs.readFileSync(contentPath + path);
    } catch(e) {
        console.log(e);
        return cache[404];
    } 
    
    cache[path] = data;
    return data;
};

var getPage = function(path) {
    if(cacheable && cache[path] !== undefined)
        return cache[path];
    
    return loadPage(path);
};