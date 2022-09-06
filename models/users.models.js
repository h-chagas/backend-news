const db = require('../db/connection')

exports.showUsers = () => {
    return db
    .query(`SELECT * FROM users;`)
    .then((result) => {
        return result.rows
    })
}