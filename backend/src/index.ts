import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRouter from "./routes/project";
import epicRouter from "./routes/epic";
import subtaskRouter from "./routes/subtask";
import sprintRouter from "./routes/sprint";
import ticketRouter from "./routes/ticket";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "./routes/userRouter";

const app = express();
const PORT = process.env.SERVER_PORT_NUMBER || 5084;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/echo";
const API_PREPEND = "/api";

app.use(cors());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses urlencoded bodies with qs library
app.use(morgan("dev")); // logging middleware
app.use(helmet()); // secure server by setting recommended HTTP response headers

app.use(`${API_PREPEND}/v1/projects`, projectRouter);
app.use(`${API_PREPEND}/v1/epics`, epicRouter);
app.use(`${API_PREPEND}/v1/subtasks`, subtaskRouter);
app.use(`${API_PREPEND}/v1/sprints`, sprintRouter);
app.use(`${API_PREPEND}/v1/tickets`, ticketRouter);
app.use(`${API_PREPEND}/v1/users`, userRouter);

app.all(`/healthcheck`, (req, res) => {
  res.send({ message: "OK" });
});

// handles all async errors
app.use(errorHandler);

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("Connection to database successful");
  // only start server if connection to backend is successful
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
});
