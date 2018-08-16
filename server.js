const http = require('http');
const hobbitPrefix = '/hobbits';

let database = {
    6094690559071897: {
       name: "Frodo", 
       birthday: "September 22, 2968 of Third Age",
       address: "Bagend, Hobbiton, Shire",
       id: "6094690559071897"
    },
    1099270857172677: {
        name: "Sam", 
        birthday: "April 6 June, 2980 of Third Age",
        address: "Hobbiton, Shire",
        id: "1099270857172677"
    },
    8504541499688703: {
        name: "Merry", 
        birthday: "30 May, 2982 of Third Age",
        address: "Shire",
        id: "8504541499688703"
    }, 
    8897236488571597: {
        name: "Pippin", 
        birthday: "January 21, 2990 of Third Age",
        address: "Shire",
        id: "8897236488571597"
    },
};

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
    body += chunk.toString();
    });
    req.on('end', () => {
    callback(body);
    });
};

let getDatabase = res => res.end(JSON.stringify(database));

let getEntry = (req, res) => {
    let id = req.url.slice((hobbitPrefix.length + 1));
    res.end(`You asked for ${JSON.stringify(database[id])}`);
};

let newEntry = (req, res) => {
    readBody(req, (body) => {
        let newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        let newHobbit = JSON.parse(body);
        newHobbit.id = newId;
        database[newId] = newHobbit;
        res.end(`You added ${newHobbit.name}: ${JSON.stringify(database[newId])}`);
    });
};

let changeEntry = (req, res) => {
    readBody(req, (body) => {
        let changeHobbit = JSON.parse(body);
        let id = changeHobbit.id;
        database[id] = changeHobbit;
        res.end(`You updated #${id}: ${JSON.stringify(changeHobbit)}`);
    });
};

let deleteEntry = (req, res) => {
    let id = req.url.slice((hobbitPrefix.length + 1));
    let deleteHobbit = database[id];       
    delete database[id];
    res.end(`You deleted ${deleteHobbit.name}: ${JSON.stringify(deleteHobbit)}`);
};

let server = http.createServer((req, res) => {
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
        res.end('404 cannot read the fiery letters');
    }
});

server.listen(3000);
