const router = require("express").Router();
const userController = require("../../controllers/userController");

// Match with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById);

  module.exports = router;