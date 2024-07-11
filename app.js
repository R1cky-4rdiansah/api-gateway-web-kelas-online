const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");
const mediaRouter = require("./routes/medias");
const orderRouter = require("./routes/orders");
const refreshTokenRouter = require("./routes/refreshTokens");
const mentorRoutes = require("./routes/mentors");
const chapterRoutes = require("./routes/chapters");
const lessonRoutes = require("./routes/lessons");
const imageCourseRoutes = require("./routes/imageCourses");
const myCourseRoutes = require("./routes/myCourse");
const reviewRoutes = require("./routes/reviews");
const webhookRoutes = require("./routes/webhook");
const roles = require("./middleware/permission");

//middleware
const middlewareToken = require("./middleware/verifyToken");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/media", middlewareToken, roles("student", "admin"), mediaRouter);
app.use("/orders", middlewareToken, roles("student", "admin"), orderRouter);
app.use("/refresh-tokens", refreshTokenRouter);
app.use("/mentors", middlewareToken, roles("admin"), mentorRoutes);
app.use("/courses", courseRouter);
app.use("/chapters", middlewareToken, roles("admin"), chapterRoutes);
app.use("/lessons", middlewareToken, roles("admin"), lessonRoutes);
app.use("/image-courses", middlewareToken, roles("admin"), imageCourseRoutes);
app.use("/my-courses", middlewareToken, roles("student", "admin"), myCourseRoutes);
app.use("/reviews", middlewareToken, roles("student", "admin"), reviewRoutes);
app.use("/webhooks", webhookRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
