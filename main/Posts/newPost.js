const pool = require("../db");

module.exports = function newPost(req, res, next) {
  const returnObject = {
    success: false,
    post_id: "",
  };
  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;
  const broad_category = req.body.category;
  pool.query(
    "INSERT INTO posts (broad_category, title, body, nickname, user_id, user_email, date_created) VALUES ($1, $2, $3, $4, $5, $6, Now()) RETURNING pid",
    [broad_category, title, body, user.nickname, user.id, user.email],
    (err, results) => {
      if (results) {
        returnObject.success = true;
        returnObject.post_id = results.rows[0].pid;
      }
      console.log(returnObject);
      res.json(returnObject);
    }
  );
};
