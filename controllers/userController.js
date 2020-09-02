const db = require("../models");

module.exports = {
  findById: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    db.User
      .findOne({username: req.params.name})
      .then(dbModel => {
        console.log(dbModel);
        if(dbModel){
          res.json(dbModel);
        }
        res.status(422).json("User not Found")
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}