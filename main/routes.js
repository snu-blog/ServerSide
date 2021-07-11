const express = require("express");
const router = express.Router();
const pool = require("./db");

//get all users from the pool
router.get("/api/get/allusers", (req, res, next) => {
  pool.query("SELECT * FROM users").then((users) => {
    res.json(users);
    console.log(users.rows);
  });
});

//post user to the pool
router.post("/api/post/adduser", (req, res, next) => {
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    false,
  ];

  pool.query(
    "INSERT INTO users (first_name, last_name, email, email_verified, date_created, last_login) values ($1, $2, $3, $4, NOW(), NOW())",
    values,
    (err, results) => {
      if (err) {
        console.log(err);
        if (err.code == 23505)
          res.status(200).send({ message: "User Already Exists" });
        else next(err);
      } else {
        res.status(200).send({ message: "Added User Successfully" });
        console.log(results);
      }
    }
  );
});
module.exports = router;
