const pool = require("../db");

// module exports function getPostsByCategory
exports.getPostsByCategory = async function getPostsByCategory(category) {
  const posts = await pool.query("SELECT * FROM posts WHERE category = $1", [
    category,
  ]);
  return posts;
};
