// Importing necessary modules and packages
const express = require("express");

const app = express();

const database = require("./config/database");
const projectRoutes = require("./routes/Project");
const userRoutes = require("./routes/User");
const taskRoutes = require("./routes/Tasks");

const cors = require("cors");
const dotenv = require("dotenv");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

app.use("/api/project/", projectRoutes);
app.use("/api/task/", taskRoutes);
app.use("/api/user/", userRoutes);

// Listening to the server

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

// End of code.
