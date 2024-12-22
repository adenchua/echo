import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";

import authenticationMiddleware from "./middlewares/authenticationMiddleware";
import errorHandler from "./middlewares/errorHandler";
import authRouter from "./routes/authRouter";
import epicRouter from "./routes/epicRouter";
import projectRouter from "./routes/projectRouter";
import sprintRouter from "./routes/sprintRouter";
import subtaskRouter from "./routes/subtaskRouter";
import ticketRouter from "./routes/ticketRouter";
import userRouter from "./routes/userRouter";

const app = express();
const PORT = process.env.SERVER_PORT_NUMBER || 5084;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/echo";
const API_PREPEND = "/api";

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(cookieParser());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses urlencoded bodies with qs library
app.use(morgan("dev")); // logging middleware
app.use(helmet()); // secure server by setting recommended HTTP response headers
app.use(
  session({
    secret: process.env.AUTH_SESSION_SECRET || "secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // 60 minutes session,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(`${API_PREPEND}/v1/projects`, authenticationMiddleware, projectRouter);
app.use(`${API_PREPEND}/v1/epics`, authenticationMiddleware, epicRouter);
app.use(`${API_PREPEND}/v1/subtasks`, authenticationMiddleware, subtaskRouter);
app.use(`${API_PREPEND}/v1/sprints`, authenticationMiddleware, sprintRouter);
app.use(`${API_PREPEND}/v1/tickets`, authenticationMiddleware, ticketRouter);
app.use(`${API_PREPEND}/v1/users`, authenticationMiddleware, userRouter);
app.use(`${API_PREPEND}/auth`, authRouter);

app.all(`/healthcheck`, (req, res) => {
  res.send({ message: "OK" });
});

// handles all async errors
app.use(errorHandler);

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", () => {
  console.error.bind(console, "connection error:");
  throw new Error("Cant connect to the database");
});
db.on("open", function () {
  console.log("Connection to database successful");
  // only start server if connection to backend is successful
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
});
