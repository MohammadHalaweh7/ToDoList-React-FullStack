const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require("mongoose");

const Todo = require("./models/todoSchema");

require("dotenv").config();

const cors = require("cors");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected To Db Successfully");
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/get-todos", async (req, res) => {
  console.log("get-todos route");

  const todos = await Todo.find();
  console.log(todos);
  res.status(200).json({ message: "todos fetched successfully", todos: todos });
});

app.post("/add-todo", async (req, res) => {
  console.log("add-todo route");
  const { taskname, assignee } = req.body;
  console.log({ taskname, assignee });

  const createdTodo = await Todo.create({
    taskname: taskname,
    assignee: assignee,
    done: false,
  });
  res
    .status(200)
    .json({ message: "todos added successfully", todos: createdTodo });
});

app.patch("/update-todo/:id", async (req, res) => {
  console.log("update-todo route");
  const { id } = req.params;
  const done = req.body.done;

  const todo = await Todo.findOne({ _id: id });
  const updatedTodo = await Todo.updateOne();
  todo.done = done;
  todo.save();
  res.status(200).json({ message: "todos updated successfully", todos: todo });
});

app.delete("/delete-todo/:id", async (req, res) => {
  console.log("delete-todos route");
  const { id } = req.params;
  console.log(id);

  await Todo.deleteOne({ _id: id });
  res.status(200).json({ message: "todos deleted successfully" });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Mohammad from server!" });
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server listening on ${PORT}`);
});
