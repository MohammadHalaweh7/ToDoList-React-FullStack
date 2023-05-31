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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.patch("/update-todo", async (req, res, next) => {
  console.log("update-todo route");
  const { id, done } = req.body;
  console.log({ id, done });

  const todo = await Todo.findOne({ _id: id });
  console.log(todo);
  const updatedTodo = await Todo.updateOne();
  todo.done = true;
  todo.save();
  res.status(200).json({ message: "todos updated successfully", todos: todo });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello Mohammad from server!" });
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server listening on ${PORT}`);
});
