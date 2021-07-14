const pool = require("../db");

module.exports = getPostsByCategory = (req, res, next) => {
  const posts = [];
  const category = req.params.category;
  pool.query(
    "SELECT * FROM posts WHERE broad_category = $1",
    [category],
    (err, results) => {
      const posts = results.rows;
      res.status(200).send(posts);
    }
  );
};
