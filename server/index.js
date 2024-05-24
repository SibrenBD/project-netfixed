
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { validate, ValidationError, Joi } from 'express-validation';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl, {
    serverApi: {

        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/animes', (req, res) => {
    fs.readFile('data/anime.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.send(data);
    });
});

//this function returns all data from the collection in Mongodb

async function fetchUsers() {

    try {
        // connect the client to the server
        await client.connect();
        //we connection with the test database
        const database = client.db("sample_mflix");
        //we connect with the user collection
        const collection = database.collection('users');
        //we fetch the users from our database
        const users = await collection.find().toArray();
        //finally we return the cheeses
        return users;
    } finally {
        // ensures that the client will close when you finish/error
        await client.close();
    }
}

async function fetchAnimeSeries() {

    try {
        // connect the client to the server
        await client.connect();
        //we connection with the test database
        const database = client.db("Netfixed-Anime");
        //we connect with the user collection
        const collection = database.collection('Anime-series');
        //we fetch the users from our database
        const users = await collection.find().toArray();
        //finally we return the cheeses
        return users;
    } finally {
        // ensures that the client will close when you finish/error
        await client.close();
    }
}

app.get('/animeSerie', (req, res) => {

    fetchAnimeSeries().then(anime => {
        res.json(anime);
    });
});

app.get('/users', (req, res) => {

    fetchUsers().then(users => {
        res.json(users);
    });
});

const userArray = [];

const registerValidation = {
    body: Joi.object({
        username: Joi.string()
        .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
};

const registerValidation2 = {
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
    }),
};

app.post('/register', validate(registerValidation, {}, {abortEarly: false}), (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    userArray.push({
        username: username,
        email: email,
        password: password
    });
    res.send( {success: true} );
});

app.post('/authenticate', validate(registerValidation2, {}, {abortEarly: false}), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //check if user exists and check password
    let loggedIn = false;
    for (let i = 0; i < userArray.length; i++) {
        const user = userArray[i];
        if (user.email.toLowerCase() === username.toLowerCase() && user.password === password) {
            res.send( {success: true} );
            loggedIn = true;
            break;
        } 
        if (user.username.toLowerCase() === username.toLowerCase() && user.password === password) {
            res.send( {success: true} );
            loggedIn = true;
            break;
        } 
    }
    if(!loggedIn){
        res.send( {success: false} );
    }
});

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
