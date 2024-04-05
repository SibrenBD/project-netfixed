<<<<<<< HEAD
import express from 'express';
import * as fs from "node:fs";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
=======
>>>>>>> parent of 625e81d (server setup completed)
