const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// App
const app = express();

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
