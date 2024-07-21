
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { validate, ValidationError, Joi } from 'express-validation';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
const fetch = require('node-fetch');
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

app.get('/video-page/:animeId', (req, res) => {
    const animeId = req.params.animeId
    fetch('http://localhost:3000/animeSerie')
.then(myData => myData.text())
.then(textData => loadVodPage(textData));

function loadVodPage(data) {
    console.log(data.animeId);
    res.setHeader('Content-Type', 'text/html');
    res.send(
        `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.animeId}</title>
    <link rel="stylesheet" href="/css/style.css" type=text/css>
</head>

<body>
    <main class="container">
        <div class="video-container">
            <div class="sidebar">
                <div class="episode-list">
                    <div class="episode-range">
                        <button>Season: 1</button>
                    </div>
                    <div class="episodes">
                        <!-- Episodes will be populated by JavaScript -->
                        <a href="" onclick="loadEpisode(1)">
                            <div class="episode">
                                <div class="episodeNumber">1</div>
                                <div class="episodeTitle"> Lorem ipsum dolor sit amet</div>
                            </div>
                        </a>
                        <a href="#episode2" onclick="loadEpisode(2)">
                            <div class="episode">
                                <h4>2 </h4>
                            </div>
                        </a>
                        <a href="#" onclick="loadEpisode(3)">
                            <div class="episode">
                                <h4>3</h4>
                            </div>
                        </a>
                        <a href="#" onclick="loadEpisode(4)">
                            <div class="episode">
                                <h4>4 </h4>
                            </div>
                        </a>
                        <a href="#" onclick="loadEpisode(5)">
                            <div class="episode">
                                <h4>5 </h4>
                            </div>
                        </a>
                        <a href="#" onclick="loadEpisode(6)">
                            <div class="episode">
                                <h4>6</h4>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div class="video-player">
                    <iframe id="videoIframe"
                        src="//embtaku.pro/streaming.php?id=MjE4NTQ2&title=Ore+dake+Level+Up+na+Ken+Episode+1&typesub=SUB"
                        frameborder="0" allowfullscreen="true" marginwidth="0" marginheight="0" scrolling="no" height="460"></iframe>
                </div>
                
                <div class="anime-info">
                    <img src="https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/07/SoloLeveling_TeaserVisual_Approved.jpg"
                        alt="Solo-Leveling">
                    <div class="anime-title">Solo-Leveling</div>
                    <div class="anime-details">
                        <p>PG-13 | HD | 24m</p>
                        <p>discription... Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, voluptas.</p>
                        <button>View detail</button>
                    </div>
                    <div class="comments">

                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
        `
    );
}

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
        //finally we return the users
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
            .regex(/[a-zA-Z0-9]{5,30}/)
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{5,30}/)
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
