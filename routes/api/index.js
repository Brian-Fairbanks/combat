const router = require("express").Router();
const userRoutes = require("./user");
const userLoginRoutes = require("./userLogin");

// Routes
router.use("/user", userRoutes);
router.use("/user-login", userLoginRoutes);

module.exports = router;