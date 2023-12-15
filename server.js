const express = require('express');
const mongojs = require('mongojs');

const db = mongojs('danilovadb', ['todos']);

const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.post('/save', (req, res) => {
    let msg = req.body.msg;
    db.todos.insert(
        {msg: msg, date: new Date().toDateString()},
        (err, data) => {
            res.send('sve ok');
        }
    );
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
