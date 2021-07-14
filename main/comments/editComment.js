// Edit comment
const pool = require("../db");

module.exports = function editComments(req, res, next) {
  const { commentId } = req.params;
  const { comment } = req.body;

  pool.connect(function (err, connection) {
    if (err) {
      connection.release();
      return next(err);
    }
    connection.query(
      `UPDATE comments SET
  		comment = $1
  		WHERE cid = $2
  		`,
      [comment, commentId],
      (err, rows) => {
        connection.release();
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          message: "Comment edited successfully",
        });
      }
    );
  });
};
