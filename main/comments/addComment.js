const pool = require("../db");

module.exports = function addComment(req, res, next) {
  const values = [
    req.body.text,
    req.body.nickname,
    req.body.user_id,
    req.body.post_id,
  ];
  pool.query(
    "INSERT INTO comments (comment, nickname, user_id, post_id, date_created) VALUES ($1, $2, $3, $4, NOW())",
    values,
    (err, results) => {
      console.log(err);
      console.log(results);
    }
  );
};
