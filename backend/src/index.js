const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user");
const projectRoute = require("./routes/project");
const epicRoute = require("./routes/epic");
const subtaskRoute = require("./routes/subtask");
const sprintRoute = require("./routes/sprint");
const storyRoute = require("./routes/story");

const app = express();
const PORT = 5084;
const URI = "mongodb://localhost:27017/echo";
const API_PREPEND = "/api";

app.use(express.json());
app.use(cors());

app.use(`${API_PREPEND}/users`, userRoute);
app.use(`${API_PREPEND}/projects`, projectRoute);
app.use(`${API_PREPEND}/epics`, epicRoute);
app.use(`${API_PREPEND}/subtasks`, subtaskRoute);
app.use(`${API_PREPEND}/sprints`, sprintRoute);
app.use(`${API_PREPEND}/stories`, storyRoute);

app.all(`${API_PREPEND}/ping`, (req, res) => {
  res.status(200).send({ message: "pong" });
});

mongoose.connect(URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("Connection to database successful");
  //only start server if connection to backend is successful
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
});
