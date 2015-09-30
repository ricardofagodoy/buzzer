var fs = require('fs'),
    cache = {
        404: "<h3>Sorry!</h3>Page not found!"
    },
    contentPath = __dirname + '/contents',
    cacheable = false;

module.exports = function(path) {
        
    switch(path) {
        case '/': 
        case '/index':
            return getPage('/index.html');
        break;            
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
