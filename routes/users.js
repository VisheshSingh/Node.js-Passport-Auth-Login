const express = require("express");
const router = express.Router();

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

  }
});

module.exports = router;
