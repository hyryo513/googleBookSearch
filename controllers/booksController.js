const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findSaved: function(req, res) {
    db.Book
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(
        err => {
          if (err.code === 11000) {
            res.json(err.code);
          }
          else {
            res.status(422).json(err.code)
          }
        });
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
