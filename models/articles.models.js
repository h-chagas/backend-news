const db = require("../db/connection");

exports.showArticlesById = (article_id) => {
   return db
   .query(`SELECT * FROM articles WHERE article_id=$1;`, [article_id])
   .then((result) => {
    if(result.rowCount === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found! Please try again' })
    }
        return result.rows[0];
   });
};
