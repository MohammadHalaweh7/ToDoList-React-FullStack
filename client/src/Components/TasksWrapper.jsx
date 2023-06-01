import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TasksControls from "./TasksControls";
import AddTaskModal from "./AddTaskModal";
import Swal from "sweetalert2";

export default function TasksWrapper() {
  const [dataParsed, setDataParsed] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");
  const [tasksCount, setTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  function showSuccessPopup(message) {
    Swal.fire(message);
  }

  const parsingData = (data) => {
    return JSON.stringify(data);
  };

  const fetchGetTodos = async () => {
    const res = await fetch("http://localhost:3001/get-todos");
    const data = await res.json();
    console.log(data.todos);
    setTasksCount(dataParsed.reduce((acc) => acc + 1, 0));
    setCompletedTasksCount(
      dataParsed.filter((task) => task.done === true).length
    );
    setCompletedTasksCount(
      dataParsed.reduce((count, task) => (task.done ? count + 1 : count), 0)
    );

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

  function onComplete(id) {
    console.log(id);
    const updatedData = dataParsed.map((element) => {
      if (element.id === id) {
        return { ...element, done: true };
      }
      return element;
    });

    setDataParsed(updatedData);
    const localStorageData = parsingData(updatedData);
    localStorage.setItem("Tasks", localStorageData);
    showSuccessPopup();
  }

  function onDelete(id) {
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
      const updatedData = dataParsed.filter((element) => element.id !== id);
      const updatedDataWithIDs = updatedData.map((element, index) => ({
        ...element,
        id: index,
      }));

      setDataParsed(updatedDataWithIDs);
      const localStorageData = parsingData(updatedDataWithIDs);
      localStorage.setItem("Tasks", localStorageData);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    });
  }

  useEffect(() => {
    fetchGetTodos();
  }, []);

  useEffect(() => {
    setTasksCount(dataParsed.length);
    setCompletedTasksCount(
      dataParsed.filter((task) => task.done === true).length
    );
  }, [dataParsed]);

  return (
    <>
      <h1 className="title">ToDo List React</h1>
      <div className="tasks-container">
        <div className="tasks-table">
          <TasksControls
            setToggle={setToggle}
            setToken={setToken}
            tasksCount={tasksCount}
            completedTasksCount={completedTasksCount}
          />
          <TaskList
            dataParsed={dataParsed}
            toggle={toggle}
            token={token}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        </div>
      </div>
      <AddTaskModal onAddClick={onAddClick} />
    </>
  );
}
