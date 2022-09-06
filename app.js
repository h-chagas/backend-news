const express = require('express');

const { getArticlesById } = require('./controllers/articles.controller');
const { getTopics } = require('./controllers/topics.controllers');
const { getUsers } = require('./controllers/users.controller');


const app = express();

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api/users', getUsers);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'route not found'})
})

//Custom error handling
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Please type/select a number to choose an article'})
    }
    else if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
    res.status(500).send({msg: 'internal server error'});
})



module.exports = app;