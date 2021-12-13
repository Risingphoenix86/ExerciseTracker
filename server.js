const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
const db = require("./models/workout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workoutDb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


// require route
app.use(require("./routes/api"));
app.use(require("./routes/html"));

app.listen(PORT, () => {
  console.log(`your app is running on http://localhost:${PORT}`);
});
