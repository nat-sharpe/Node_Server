const http = require('http');
const fs = require('fs');
const pg = require('pg-promise')();
const dbConfig = ('postgres://nat@localhost:5432/nat');
const db = pg(dbConfig);

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
};

const hobbitPrefix = '/hobbits/';

// db.query('select * from hobbitDatabase;')
//     .then((results) => console.log(results[2].name))
//     .then(() => pg.end());

let getDatabase = (req, res) => {
    db.query('select * from nat;')
        .then((results) => res.end(JSON.stringify(results)))
        .then(() => pg.end());
};

let getEntry = (req, res, ) => {
    let id = req.url.slice(hobbitPrefix.length);
    res.end(`You asked for ${JSON.stringify(database[id])}`);
};

let newEntry = (req, res) => {
    readBody(req, (body) => {
        let newId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
        let newHobbit = JSON.parse(body);
        newHobbit.id = newId;
        database[newId] = newHobbit;
        res.end(`You added ${newHobbit.name}: ${JSON.stringify(newHobbit)}`);
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
    let id = req.url.slice(hobbitPrefix.length);
    let deleteHobbit = database[id];       
    delete database[id];
    res.end(`You deleted ${deleteHobbit.name}: ${JSON.stringify(deleteHobbit)}`);
};

let notFound = (req, res) => {
    res.end('404: Cannot read the fiery letters');
};

let routes = [
    {
        method: 'GET',
        url: /^\/hobbits\/([0-9]+)$/,
        run: getEntry
    },
    {
        method: 'DELETE',
        url: /^\/hobbits\/([0-9]+)$/,
        run: deleteEntry
    },
    {
        method: 'PUT',
        url: /^\/hobbits\/?$/,
        run: changeEntry
    },
    {
        method: 'GET',
        url: /^\/hobbits\/?$/,
        run: getDatabase
    },
    {
        method: 'POST',
        url: /^\/hobbits\/?$/,
        run: newEntry
    },
    {
        method: 'GET',
        url: /^.*$/,
        run: notFound
    }
];

let server = http.createServer((req, res) => {
    fs.readFile('Front_End' + req.url, (err, data) => {
        if (err) {
            let route = routes.find(route => 
                route.url.test(req.url) &&
                req.method === route.method
            );
            route.run(req, res);
        } else {
            res.end(data);
        }
    });
});

server.listen(3000);