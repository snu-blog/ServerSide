const express = require("express");
const router = express.Router();
const pool = require("./db");

//get all posts from posts psql server
router.get("/api/get/allusers", async (req, res, next) => {
  pool.query("SELECT * FROM users").then((users) => {
    res.json(users);
    console.log(users.rows);
  });
  await pool.end();
});

module.exports = router;
