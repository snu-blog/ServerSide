const pool = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function loginHandler(req, res, next) {
  //object for storing authentication check
  const authenticateUser = {
    doesNotExist: false,
    passwordMatch: false,
    token: {
      key: "",
      expirationDate: "",
    },
    data: {},
  };
  const values = [req.body.username, req.body.password];
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
          authenticateUser.passwordMatch = true;
          authenticateUser.data = results.rows[0];
          authenticateUser.data.password = null;
          const token = jwt.sign(
            results.rows[0].uid,
            process.env.ACCESS_TOKEN_SECRET
          );
          authenticateUser.token.key = token;
          pool.query(
            "UPDATE users SET last_login = $1 WHERE uid = $2",
            ["Now()", results.rows[0].uid],
            (e, r) => {
              if (e) throw new e();
            }
          );
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
};
