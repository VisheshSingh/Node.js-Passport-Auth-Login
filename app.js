const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// App
const app = express();

// Passort config
require('./config/passport')(passport);

// BODY PARSER
app.use(express.urlencoded({ extended: false }));

// EXPRESS-SESSION
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH
app.use(flash());

// GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// CONNECT TO DB
const db = require("./config/keys").MongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
