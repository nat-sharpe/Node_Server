var http = require('http');
var database = {
    6094690559071897: {
       name: "Frodo", 
       birthday: "20 Aug 3300",
       address: "Bagend",
       id: "6094690559071897"
    },
    1099270857172677: {
        name: "Sam", 
        birthday: "21 Jan 3290",
        address: "Hobbiton",
        id: "1099270857172677"
    },
    8504541499688703: {
        name: "Merry", 
        birthday: "4 June 3312",
        address: "Bree",
        id: "8504541499688703"
    }, 
    8897236488571597: {
        name: "Pippin", 
        birthday: "16 October 3314",
        address: "Bree",
        id: "8897236488571597"
    },
};
var hobbitPrefix = '/hobbits';

var readBody = function(req, callback) {
    var body = '';
    req.on('data', function(chunk) {
    body += chunk.toString();
    });
    req.on('end', function() {
    callback(body);
    });
};

var getDatabase = function (res) {
    res.end(JSON.stringify(database));
};

var getEntry = function (req, res) {
    var id = req.url.slice((hobbitPrefix.length + 1));
    res.end(`You asked for ${JSON.stringify(database[id])}`);
};

var newEntry = function (req, res) {
    readBody(req, function(body) {
        var newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        var newHobbit = JSON.parse(body);
        newHobbit.id = newId;
        database[newId] = newHobbit;
        res.end(`You added ${newHobbit.name}: ${JSON.stringify(database[newId])}`);
    });
};

var changeEntry = function (req, res) {
    readBody(req, function(body) {
        var changeHobbit = JSON.parse(body);
        var id = changeHobbit.id;
        database[id] = changeHobbit;
        res.end(`You updated #${id}: ${JSON.stringify(changeHobbit)}`);
    });
};

var deleteEntry = function (req, res) {
    var id = req.url.slice((hobbitPrefix.length + 1));
    var deleteHobbit = database[id];       
    delete database[id];
    res.end(`You deleted ${deleteHobbit.name}: ${JSON.stringify(deleteHobbit)}`);
};

var server = http.createServer(function(req, res) {
    if (req.url === hobbitPrefix && req.method === 'GET') {
        getDatabase(res);
    } else if (req.url.startsWith(hobbitPrefix) && req.method === 'GET') {
        getEntry(req, res);
    } else if (req.url.startsWith(hobbitPrefix) && req.method === 'POST') {
        newEntry(req, res);
    } else if (req.url.startsWith(hobbitPrefix) && req.method === 'PUT') {
        changeEntry(req, res);
    } else if (req.url.startsWith(hobbitPrefix) && req.method === 'DELETE') {
        deleteEntry(req, res);
    } else {
        res.end('404 no hobbit found');
    }
});

server.listen(3000);

currentID = 0

