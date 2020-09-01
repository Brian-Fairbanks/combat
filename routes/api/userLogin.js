const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
  // console.log(req.body);
  res.json(req.user);
});

router.get("/login", function(req, res) {
  console.log(req.user);
  res.json(req.user);
});

router.post("/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function () {
      // res.json(res);
      res.redirect(307, "/api/user-login/login");
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json(err);
    });
});

router.get("logout", function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.json({})
  });
});

module.exports = router;