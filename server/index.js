const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require("mongoose");

const Todo = require("./models/todoSchema");

require("dotenv").config();

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected To Db Successfully");
};

app.get("/get-todos", async (req, res, next) => {
  console.log("get-todos route");

  const todos = await Todo.find()
  console.log(todos);
  res.status(200).json({ message: "todos fetched successfully", todos: todos })
})

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello Mohammad from server!" });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server listening on ${PORT}`);
});
