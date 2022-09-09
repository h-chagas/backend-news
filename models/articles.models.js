const db = require("../db/connection");

exports.showArticlesById = (article_id) => {
   return db
      .query(`SELECT * FROM articles WHERE article_id=$1;`, [article_id])
      .then((result) => {
         if (result.rowCount === 0) {
            return Promise.reject({
               status: 404,
               msg: "Article not found! Please try again",
            });
         }
         return result.rows[0];
      });
};

exports.updateArticleVotes = (article_id, updateVotes) => {
   const id = article_id;
   let votes = updateVotes.inc_votes;

   return db
      .query(
         `UPDATE articles SET votes = votes+$1 WHERE article_id=$2 RETURNING *;`,
         [votes, id]
      )
      .then((result) => {
         return result.rows[0];
      });
};

exports.showArticles = (topic) => {
   let queryStr = `SELECT
articles.author, 
articles.title, 
articles.article_id, 
articles.topic, 
articles.created_at, 
articles.votes,
COUNT (comments.article_id)::INT AS comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id 
`;

   let queryValue = [];

   if (topic) {
      queryStr += ` WHERE articles.topic = $1`;
      queryValue.push(topic);
   }

   queryStr += `GROUP BY articles.article_id ORDER BY articles.created_at DESC;`;

   return db.query(queryStr, queryValue)
   .then((result) => {
      if (result.rowCount === 0) {
         return Promise.reject({
            status: 404,
            msg: "Topic doesn\'t exist or not related to any of articles.",
         });
      }
      return result.rows;
   });
};

exports.showCommentsByArticleId = (article_id) => {
    return db
    .query(
        `
        SELECT * 
        FROM comments 
        WHERE article_id=$1;
        `
       , [article_id])
    .then((result) => {
        if (result.rowCount === 0) {
            return Promise.reject({
               status: 404,
               msg: "No comments for this article.",
            });
         }
        return result.rows
    })
}