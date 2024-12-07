const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("dotenv").config();
const port = process.env.PORT;
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.INTERNALURL,
});

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", (req, res) => {
  const { fname, lname, email, comment } = req.body;
  try {
    client.query(
      "INSERT INTO users (fname, lname, email, comment) VALUES ($1, $2, $3, $4) RETURNING id",
      [fname, lname, email, comment],
      (err, result) => {
        if (err) console.error(err);
        console.log("User inserted with ID:", result.rows[0].id);
      }
    );

    client.query(
      "INSERT INTO comments (comment, rate, email) VALUES ($1, $2, $3)",
      [comment, 0, email],
      (err) => {
        if (err) console.error(err);
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

        client.query(
          "SELECT c.email, c.comment, AVG(rate) AS average_rate FROM comments AS c NATURAL JOIN users AS u GROUP BY c.comment, c.email ORDER BY average_rate DESC;",
          (err, result) => {
            if (err) console.error(err);
            io.on("connection", (socket) => {
              socket.emit("commentRate", result.rows);
            });
          }
        );

        client.query("SELECT * FROM users ORDER BY id DESC", (err, result) => {
          if (err) console.error(err);
          io.on("connection", (socket) => {
            socket.emit("commentData", result.rows);
          });
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
});

app.post("/addRate", (req, res) => {
  const { rate, comment, email } = req.body;

  client.query(
    `SELECT * FROM comments WHERE comment = $1 AND email = $2`,
    [comment, email],
    (err, result) => {
      if (err) console.error(err);
      if (result.rows.length == 1) {
        client.query(
          `INSERT INTO comments (comment, email, rate) VALUES ($1, $2, $3)`,
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
        client.query(
          `INSERT INTO comments (comment, email, rate) VALUES ($1, $2, $3)`,
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

  client.query(
    "SELECT c.email, c.comment, AVG(rate) AS average_rate FROM comments AS c NATURAL JOIN users AS u GROUP BY c.comment, c.email ORDER BY average_rate DESC;",
    (err, result) => {
      if (err) console.error(err);
      io.on("connection", (socket) => {
        socket.emit("commentRate", result.rows);
      });
    }
  );
});

server.listen(port, () => {
  console.log(`The server is listenig to port :${port}`);
});
