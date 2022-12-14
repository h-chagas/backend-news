const { showTopics } = require('../models/topics.models')


exports.getTopics = (req, res, next) => {
    showTopics()
    .then( (topics) => {
        res.status(200).send( topics )
    })
    .catch((err) => {
        next(err);
     });
}