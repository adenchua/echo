import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRouter from "./routes/project.js";
import epicRouter from "./routes/epic.js";
import subtaskRouter from "./routes/subtask.js";
import sprintRouter from "./routes/sprint.js";
import ticketRouter from "./routes/ticket.js";

const app = express();
const PORT = process.env.SERVER_PORT_NUMBER || 5084;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/echo";
const API_PREPEND = "/api";

app.use(express.json());
app.use(cors());
app.use(morgan("combined")); // logging middleware
app.use(helmet()); // secure server by setting recommended HTTP response headers

app.use(`${API_PREPEND}/v1/projects`, projectRouter);
app.use(`${API_PREPEND}/v1/epics`, epicRouter);
app.use(`${API_PREPEND}/v1/subtasks`, subtaskRouter);
app.use(`${API_PREPEND}/v1/sprints`, sprintRouter);
app.use(`${API_PREPEND}/v1/tickets`, ticketRouter);

app.all(`/healthcheck`, (req, res) => {
  res.send();
});

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("Connection to database successful");
  // only start server if connection to backend is successful
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
});
