const express = require("express");
const router = express.Router();
const pool = require("./db");
const loginHandler = require("./auth/loginHandler");
const registerHandler = require("./auth/registerHandler");

//register a new user
router.post("/api/register", (req, res, next) => {
  registerHandler(req, res, next);
});

//authenticate
router.post("/api/authenticate", (req, res, next) => {
  loginHandler(req, res, next);
});

module.exports = router;
