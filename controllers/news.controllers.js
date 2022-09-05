const { showTopics } = require('../models/news.models')


exports.getTopics = (req, res, next) => {
    showTopics().then( (topics) => {
        res.status(200).send( topics )
    })
    .catch(next)
}