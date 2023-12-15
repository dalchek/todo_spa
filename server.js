const express = require('express');
const mongojs = require('mongojs');

const db = mongojs('danilovadb',['todos']);

const app = express();

app.use(express.static(__dirname + "/public"))

app.listen(3000, () => {
    console.log('Listening on port 3000');
})