
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors';

dotenv.config();

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

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
