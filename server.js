const http = require('http');

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

const hobbitPrefix = '/hobbits/';

let getDatabase = (req, res) => res.end(JSON.stringify(database));

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
    let route = routes.find(route => 
        route.url.test(req.url) &&
        req.method === route.method
    );
    route.run(req, res);
});

server.listen(3000);