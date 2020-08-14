const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const authRouter = require('./routes/auth');
// const eventRouter = require("./routes/events");
// const serviceRouter = require("./routes/services");
// const interestRouter = require("./routes/interests");
// const needRouter = require("./routes/needs");
// const postRouter = require("./routes/posts");
// const tutorialRouter = require("./routes/tutorials");
const { environment } = require("./config");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "https://commune-app-frontend.herokuapp.com/" }));
} else {
  app.use(cors({ orgin: "http://localhost:3000" }));
}

app.use(morgan("dev"));
app.use("/api/", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  const err = new Error("The requested resource could not be found.");
  err.errors = ["The requested resource could not be found."];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
