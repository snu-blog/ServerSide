const pool = require("../db");

module.exports = function getPostsById(id) {
  const post = {
    error: false,
    data: {},
  };
  pool.query("SELECT * FROM posts WHERE pid = $1", [id], (err, results) => {
    if (err) {
      post.error = true;
    } else {
      post.data = results.rows[0];
      console.log(post);
    }
  });
};
