const http = require('http');
const fs = require('fs');

let database = {
    6094690559071897: {
       name: "Frodo", 
       email: "frodo9fingers@bagend.com",
       phone: "(505) 950-3330",
       address: "Bagend, Hobbiton, Shire",
       id: "6094690559071897"
    },
    1099270857172677: {
        name: "Sam", 
        email: "greenthumb88@bagend.com",
        phone: "(505) 345-1002",
        address: "Hobbiton, Shire",
        id: "1099270857172677"
    },
    8504541499688703: {
        name: "Merry", 
        email: "mushrooms@shortcut.org",
        phone: "(208) 038-1000",
        address: "Shire",
        id: "8504541499688703"
    }, 
    8897236488571597: {
        name: "Pippin", 
        email: "fool_of_a_took@hairyfeet.com",
        phone: "(219) 295-0333",
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