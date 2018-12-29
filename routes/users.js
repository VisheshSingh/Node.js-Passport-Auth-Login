const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User')

// LOGIN PAGE
router.get("/login", (req, res) => res.render("login"));
// REGISTER PAGE
router.get("/register", (req, res) => res.render("register"));

// REGISTER HANDLE
router.post("/register", (req, res) => {
  let { name, email, password, password2 } = req.body;
  let errors = [];

  // CHECK FOR ALL FIELDS
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all the fields" });
  }
  // CHECK IF PASSWORDS MATCH
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  // CHECK FOR PASSWORD LENGTH
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters long" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // VALIDATION PASSED
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists!' });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        // Encrypt password and add user
        const newUser = new User({
          name,
          email,
          password
        })

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          // Save user
          newUser.save().then(user => {
            req.flash('success_msg', 'You are registered and can log in!')
            res.redirect("/users/login");
          }).catch(err => console.log(err))
        }))
      }
    }).catch(err => console.log(err))
  }
});

module.exports = router;
