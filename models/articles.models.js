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

exports.updateArticleVotes = (article_id, updateVotes) => {
    const id = article_id;
    let votes = updateVotes.inc_votes;
    
    return db.
    query(`UPDATE articles SET votes = votes+$1 WHERE article_id=$2 RETURNING *;`, [votes, id])
    .then((result) => {
        return result.rows[0]
    })
}
