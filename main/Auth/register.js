const pool = require("../db");

module.exports = function registerHandler(req, res, next) {
  const newUser = {
    AlreadyExists: false,
    Confirmed: false,
    unknownError: false,
  };

  const values = [
    req.body.nickname,
    req.body.name,
    req.body.email,
    req.body.password,
  ]; //Received from Frontend
  pool.query(
    "INSERT INTO users (nickname, full_name, email, password, date_created, last_login) values ($1, $2, $3, $4, NOW(), NOW())",
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
};
