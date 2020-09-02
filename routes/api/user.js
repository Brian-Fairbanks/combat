const router = require("express").Router();
const userController = require("../../controllers/userController");

// Match with "/api/user/:id"
router
  .route("/:name")
  .get(userController.findByName);

  module.exports = router;