const pool = require("../db");

module.exports = function commentsOfAPost(req, res, next) {
  console.log(1);
  const id = req.params.id;
  const comments = {
    noComments: true,
    comments: [],
  };

  pool.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY date_created ASC",
    [id],
    (err, results) => {
      if (results.rowCount > 0) {
        comments.comments = results.rows;
        comments.noComments = false;
      }
      res.status(200).send(comments);
    }
  );
};
