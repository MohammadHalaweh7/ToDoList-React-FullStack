const mongoose = require("mongoose")

// { id: 0, taskname: "Hello", assignee: "World", done: false }

const TodoSchema = new mongoose.Schema({
  taskname: String,
  assignee: String,
  done: Boolean
});

const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo
