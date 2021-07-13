const express = require("express");
const router = express.Router();
const pool = require("./db");

//object for storing new user
const newUser = {
  AlreadyExists: false,
  Confirmed: false,
  unknownError: false,
};

//object for storing authentication check
const authenticateUser = {
  doesNotExist: false,
  passwordMatch: false,
  data: {},
};

//register a new user
router.post("/api/post/adduser", (req, res, next) => {
  //const values = [req.body.name, req.body.email, req.body.password]; //Received from Frontend
  const values = ["a", "a", "a"];
  pool.query(
    "INSERT INTO users (user_name, email, password, date_created, last_login) values ($1, $2, $3, NOW(), NOW())",
    values,
    (err, results) => {
      if (err) {
        console.log("User Already Exists");
        //If a user already exists
        if (err.code == 23505) newUser.AlreadyExists = true;
        else newUser.unknownError = true;
      } else {
        newUser.Confirmed = true;
        console.log("New User Confirmed");
      }
      res.status(200).send(newUser);
    }
  );
});

//authenticate
router.post("/api/authenticate", (req, res, next) => {
  const values = [req.body.email, req.body.password];
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [values[0]],
    (err, results) => {
      //No such user with the given email exists
      if (results.rowCount === 0) {
        authenticateUser.doesNotExist = true;
      } else if (!err) {
        //User exists and passwords Match
        if (results.rows[0].password === values[1]) {
          console.log("Match!");
          authenticateUser.passwordMatch = true;
          authenticateUser.data = results.rows[0];
          authenticateUser.data.password = null;
        }
        //Password does not match
        else {
          console.log("Not a match!");
        }
      }
      // unknownError
      else {
        console.log(err);
        next(err);
      }
      res.status(200).send(authenticateUser);
    }
  );
});

module.exports = router;
