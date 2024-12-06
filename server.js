const path = require("path");
const mysql = require("mysql2");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) console.error(err);
  console.log("Connection to mysql successful!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", (req, res) => {
  const { fname, lname, email, comment } = req.body;
  try {
    connection.query(
      "INSERT INTO users (fname,lname,email,comment) VALUES (?,?,?,?)",
      [fname, lname, email, comment],
      (err) => {
        console.log(err);
      }
    );

    connection.query(
      "INSERT INTO comments (comment,rate,email) VALUES (?,?,?)",
      [comment, 0, email],
      (err) => {
        console.log(err);
      }
    );

    fs.readFile(
      path.join(__dirname, "public", "pages", "thanks.html"),
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const response = data
          .replace("{{fname}}", fname)
          .replace("{{lname}}", lname);
        res.send(response);

        connection.query(
          "SELECT c.email, c.comment, AVG(rate) AS average_rate FROM comments AS c NATURAL JOIN users AS u GROUP BY c.comment, c.email ORDER BY average_rate DESC;",
          (err, result) => {
            if (err) console.error(err);
            io.on("connection", (socket) => {
              socket.emit("commentRate", result);
            });
          }
        );

        connection.query(
          "SELECT * FROM users ORDER BY id DESC ",
          (err, result) => {
            if (err) console.error(err);
            io.on("connection", (socket) => {
              socket.emit("commentData", result);
            });
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
  }
});

app.post("/addRate", (req, res) => {
  const { rate, comment, email } = req.body;

  connection.query(
    `SELECT * FROM comments WHERE comment = ? AND email = ?`,
    [comment, email],
    (err, result) => {
      if (err) console.error(err);
      if (result.length == 1) {
        connection.query(
          `INSERT INTO comments (comment, email, rate) VALUES (?,?,?)`,
          [comment, email, 2 * rate],
          (error, results) => {
            if (error) {
              console.error("Error updating rate:", error);
              return res
                .status(500)
                .send("An error occurred while updating the rate.");
            }
          }
        );
      } else {
        connection.query(
          `INSERT INTO comments (comment, email, rate) VALUES (?,?,?)`,
          [comment, email, rate],
          (error, results) => {
            if (error) {
              console.error("Error updating rate:", error);
              return res
                .status(500)
                .send("An error occurred while updating the rate.");
            }
          }
        );
      }
    }
  );

  connection.query(
    "SELECT c.email, c.comment, AVG(rate) AS average_rate FROM comments AS c NATURAL JOIN users AS u GROUP BY c.comment, c.email ORDER BY average_rate DESC;",
    (err, result) => {
      if (err) console.error(err);
      io.on("connection", (socket) => {
        socket.emit("commentRate", result);
      });
    }
  );
});

server.listen(port, () => {
  console.log(`The server is listenig to port :${port}`);
});
