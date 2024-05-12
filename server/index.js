
import express from 'express';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/animes', (req, res) => {
    fs.readFile('data/animes.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.send(data);
    });
});

app.get('/movies', (req, res) => {
    fs.readFile('data/movies.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.send(data);
    });
});

app.get('/new', (req, res) => {
    fs.readFile('data/new.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        res.send(data);
    });
});

app.get("/api/<route>", async (req, res) => {
    let collection = await db.collection("<collection-name>");
    let results = await collection.find({})
    .limit(50)
    .toArray();
    console.log(results);
    res.send(results).status(200);
});

import { connection } from './db.js';

app.get("/api/<route>", async (req, res) => {
    let collection = connection.collection("AdminUser");
    let results = await collection.find({}).limit(50).toArray();
    console.log(results);
    res.send(results).status(200);
});

connectToMongoDB().then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`Example app listening on port ${port}`);
    });
});
