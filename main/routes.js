const express = require("express");
const router = express.Router();
const loginHandler = require("./auth/loginHandler");
const registerHandler = require("./auth/registerHandler");
const postByCategoryHandler = require("./Posts/Category");
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

module.exports = router;
