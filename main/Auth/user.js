// Export User data to the frontend

const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userData = (req, res, next) => {
  const userData = {
    success: false,
    data: {},
  };
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Error decoding token: ", err);
      } else
        pool.query(
          `SELECT * FROM users WHERE uid = ${decoded}`,
          (err, rows) => {
            userData.data = rows.rows[0];
            userData.data.password = "";
            return res.json(userData);
          }
        );
    });
  } else {
    return res.json(userData);
  }
};

module.exports = userData;
