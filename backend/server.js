require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
/*
app.get("/", (req, res) => {
  res.json({ messg: "Welcome to the app" });
});
*/
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
