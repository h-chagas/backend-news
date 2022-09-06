const db = require('../db/connection')

exports.showTopics = () => {
    return db
    .query('SELECT * FROM topics;')
    .then( (result) => {
        return result.rows
    })
}