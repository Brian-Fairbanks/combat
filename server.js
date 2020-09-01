const express = require("express");
const db = require("./models");
const mongoose = require("mongoose");
const cors = require('cors')
const routes = require("./routes");
const app = express();
const session = require("express-session");
const passport = require("./config/passport");
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3004;

// middleware
app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

// serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// use sessions to keep track of user
app.use(session({ secret: "combat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use(routes);

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/combat", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// start API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});