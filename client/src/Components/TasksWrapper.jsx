import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TasksControls from "./TasksControls";
import AddTaskModal from "./AddTaskModal";
import Swal from "sweetalert2";

export default function TasksWrapper() {
  const [dataParsed, setDataParsed] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");
  const [notCompletedTasksCount, setNotCompletedTaskCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  function showSuccessPopup(message) {
    Swal.fire(message);
  }

  const fetchGetTodos = async () => {
    const res = await fetch("http://localhost:3001/get-todos");
    const data = await res.json();
    console.log(data.todos);
    return setDataParsed(data.todos);
  };

  const onAddClick = async (taskname, assignee) => {
    console.log("onaddclick");
    const addTodo = await fetch("http://localhost:3001/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskname, assignee }),
    });
    console.log(addTodo);
    showSuccessPopup("Todo Added Successfully");
    await fetchGetTodos();
  };

  const onComplete = async (id) => {
    console.log("Completed")
    console.log(id)
    const res = await fetch(`http://localhost:3001/update-todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    })
    const data = await res.json()
    console.log(data)
    fetchGetTodos()
  }

  const onNotComplete = async (id) => {
    console.log("notCompleted")
    console.log(id)
    const res = await fetch(`http://localhost:3001/update-todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: false }), // Include the 'done' field in the request body
    })
    const data = await res.json()
    console.log(data)
    fetchGetTodos()
  }

  const onDelete = async (id) => {
    const res = await fetch(`http://localhost:3001/delete-todo/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      showSuccessPopup("Todo Deleted Successfully");
      fetchGetTodos();
    });
  };

  useEffect(() => {
    fetchGetTodos();
  }, []);

  useEffect(() => {
    setNotCompletedTaskCount(
      dataParsed.reduce((count, task) => (!task.done ? count + 1 : count), 0)
    )
    setCompletedTasksCount(
      dataParsed.reduce((count, task) => (task.done ? count + 1 : count), 0)
    )
  })

  return (
    <>
      <h1 className="title">ToDo List React</h1>
      <div className="tasks-container">
        <div className="tasks-table">
          <TasksControls
            setToggle={setToggle}
            setToken={setToken}
            notCompletedTasksCount={notCompletedTasksCount}
            completedTasksCount={completedTasksCount}
          />
          <TaskList
            dataParsed={dataParsed}
            toggle={toggle}
            token={token}
            onComplete={onComplete}
            onNotComplete={onNotComplete}
            onDelete={onDelete}
          />
        </div>
      </div>
      <AddTaskModal onAddClick={onAddClick} />
    </>
  );
}
