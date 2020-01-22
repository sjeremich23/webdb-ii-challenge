const express = require("express");
const helmet = require("helmet");

const db = require("../data/db-config");

const server = express();
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json({ cars });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, Error: "Cannot get data.  It's not you, it's ME" });
    });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(cars => {
      res.status(200).json({ cars });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, Error: "Cannot get data.  It's not you, it's ME" });
    });
});

server.post("/", (req, res) => {
  const { carData } = req.body;

  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(car => {
          res
            .status(201)
            .json({ car, Message: "Successfully added to Database" });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, Error: "Cannot post data.  It's not you, it's ME" });
    });
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const { changes } = req.body;

  db("cars")
    .update(changes)
    .where({ id })
    .then(count => {
      if (count > 0) {
        res
          .status(200)
          .json({ Message: `${count} car(s) successfully updated` });
      } else {
        res.status(404).json({ Message: "Car not in database" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, Error: "Cannot update data.  It's not you, it's ME" });
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({
        Message: `${count} car(s) with id of ${id} successfully deleted`
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, Error: "Cannot remove data.  It's not you, it's ME" });
    });
});

module.exports = server;
