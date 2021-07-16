const query = {
  create: (text, values) => {
    return {
      text,
      values,
    };
  },
};

const getPostsByCategory = (category) =>
  query.create("SELECT * FROM posts WHERE broad_category = $1", [category]);

const newPost = (post) =>
  query.create(
    "INSERT INTO posts (broad_category, title, body, nickname, user_id, user_email, date_created) VALUES ($1, $2, $3, $4, $5, $6, Now()) RETURNING pid",
    [
      post.category,
      post.title,
      post.body,
      post.nickname,
      post.user_id,
      post.user_email,
    ]
  );

// export all methods
module.exports = { getPostsByCategory, newPost };
