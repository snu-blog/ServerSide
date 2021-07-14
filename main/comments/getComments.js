const pool = require("../db");

module.exports = function commentsOfAPost(req, res, next) {
  const post_id = req.params.post_id;
  const comments = {
    noComments: true,
    comments: [],
  };

  pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY date_created ASC",
    [post_id],
    (err, results) => {
      if (results.rowCount > 0) {
        comments.comments = results.rows;
        comments.noComments = false;
      }
      res.status(200).send(comments);
    }
  );
};
