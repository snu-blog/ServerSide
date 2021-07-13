const express = require("express");
const router = express.Router();
const loginHandler = require("./auth/loginHandler");
const registerHandler = require("./auth/registerHandler");
const postByCategoryHandler = require("./Posts/Category");
const getCommentsHandler = require("./Comments/CommentsOfAPost");
const addCommentHandler = require("./comments/addComment");

//register a new user
router.post("/api/register", (req, res, next) => {
  registerHandler(req, res, next);
});

//authenticate
router.post("/api/authenticate", (req, res, next) => {
  loginHandler(req, res, next);
});

// get all the posts from this given category
router.get("/api/getPostsByCategory/:category", (req, res, next) => {
  postByCategoryHandler(req, res, next);
});

// get all comments of a given post
router.get("/api/commentsOfAPost/:id", (req, res, next) => {
  getCommentsHandler(req, res, next);
});

router.post("/api/addComment", (req, res, next) => {
  addCommentHandler(req, res, next);
});

module.exports = router;
