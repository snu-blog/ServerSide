const schema = require("./Schema");
const pool = require("../db");

const getPostsByCategory = async (req, res, next) => {
  const posts = {
    status: "Fail",
    error: "",
    posts: [],
  };
  const category = req.params.category;
  pool.query(schema.getPostsByCategory(category), (err, result) => {
    if (err) {
      console.log(err);
      posts.error = err;
    } else {
      posts.status = "Success";
      posts.posts = result.rows;
    }
    res.json(result.rows);
  });
};

const newPost = async (req, res, next) => {
  const postStatus = {
    status: "Fail",
    error: "",
    new_post_id: "",
  };
  const post = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    nickname: req.body.nickname,
    user_id: req.body.user_id,
    user_email: req.body.user_email,
  };
  console.log(schema.newPost(post));
  pool.query(schema.newPost(post), (err, result) => {
    if (err) {
      console.log(err);
      postStatus.error = err;
    } else {
      postStatus.status = "Success";
      postStatus.new_post_id = result.rows[0].pid;
    }
    res.json(postStatus);
  });
};

module.exports = {
  getPostsByCategory,
  newPost,
};
