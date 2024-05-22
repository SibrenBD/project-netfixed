
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl, {
    serverApi: {

        version: ServerApiVersion.v1,

        strict: true,

        deprecationErrors: true,
    }
});

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/animes', (req, res) => {
    fs.readFile('data/anime.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.send(data);
    });
});

//this function returns all cheeses from the cheese collection in Mongodb

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

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
