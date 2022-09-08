const express = require('express');
const apiRouter = require('./routers/api.router');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'route not found'})
})

//Custom error handling
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'Bad request. Invalid datatype.'})
    }
    else if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
    res.status(500).send({msg: 'internal server error'});
})

module.exports = app;