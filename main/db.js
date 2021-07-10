const { Pool } = require("pg");

const pool = new Pool({
  user: "prathamaggarwal",
  host: "localhost",
  database: "prathamaggarwal",
  password: "",
  post: 5432,
});

module.exports = pool;
