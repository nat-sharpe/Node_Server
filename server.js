var http = require('http');
var database = {131:"Frodo", 293:"Samwise", 345:"Pippin", 402:"Merry"};
var hobbitPrefix = '/hobbits/';

var server = http.createServer(function(req, res) {
    if (req.url === hobbitPrefix && req.method === 'GET') {
        res.end(JSON.stringify(database));
    } else if (req.url.startsWith('/hobbits/') && req.method === 'GET') {
        var index = req.url.slice(hobbitPrefix.length);
        res.end(`You asked for ${database[index]}`);
    } else if (req.url.startsWith('/hobbits/') && req.method === 'POST') {
        var name = req.url.slice(hobbitPrefix.length);
        var index = Math.floor(Math.random() * 1000);
        database[index] = name;
        res.end(`Hobbit added at index #${index}`);
    } else if (req.url.startsWith('/hobbits/') && req.method === 'PUT') {
        // update single entry
    } else if (req.url.startsWith('/hobbits/') && req.method === 'DELETE') {
        var index = req.url.slice(hobbitPrefix.length);
        var name = database[num];       
        delete database[num];
        res.end(`You deleted ${database[name]}`);
    } else {
        res.end('404 no hobbit found');
    }
});

server.listen(3000);

