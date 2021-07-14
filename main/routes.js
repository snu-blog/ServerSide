const express = require("express");
const router = express.Router();
const loginHandler = require("./auth/login");
const registerHandler = require("./auth/register");
const postByCategoryHandler = require("./Posts/Category");
const getCommentsHandler = require("./comments/getComments");
const addCommentHandler = require("./comments/addComment");
const newPostHandler = require("./Posts/newPost");
const editCommentHandler = require("./comments/editComment");
const userDataHandler = require("./Auth/user.js");
// USER HANDLING
//register a new user
router.post("/user/register", (req, res, next) => {
  registerHandler(req, res, next);
});

// login
router.post("/user/login", (req, res, next) => {
  loginHandler(req, res, next);
});

// fetch user
router.post("/user/data/:id", (req, res, next) => {
  userDataHandler(req, res, next);
});

//POST HANDLING
// new post
router.post("/post/newpost", (req, res, next) => {
  newPostHandler(req, res, next);
});

// get all the posts from this given category
router.get("/post/getPostsByCategory/:category", (req, res, next) => {
  postByCategoryHandler.getPostsByCategory(req, res, next);
});

//COMMENT HANDLING
// get all comments of a given post
router.get("/comments/:post_id", (req, res, next) => {
  getCommentsHandler(req, res, next);
});

// add a comment to a given post
router.post("/comment/add", (req, res, next) => {
  addCommentHandler(req, res, next);
});

// Edit a comment
router.put("/comment/edit/:commentId", (req, res, next) => {
  editCommentHandler(req, res, next);
});

module.exports = router;
