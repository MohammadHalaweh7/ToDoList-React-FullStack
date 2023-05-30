import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TasksControls from "./TasksControls";
import AddTaskModal from "./AddTaskModal";
import Swal from "sweetalert2";

export default function TasksWrapper() {
  const [dataParsed, setDataParsed] = useState([
    { id: 0, taskname: "Hello", assignee: "World", done: false },
    { id: 1, taskname: "Hello2", assignee: "World2", done: true },
  ]);
  const [isData, setIsData] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("");
  const [tasksCount, setTasksCount] = useState(dataParsed.length);
  const [completedTasksCount, setCompletedTasksCount] = useState(
    dataParsed.filter((task) => task.done === true).length
  );

  function showSuccessPopup() {
    Swal.fire("Good job!", "You clicked the button!", "success");
  }

  const parsingData = (data) => {
    return JSON.stringify(data);
  };

  function getDataFromLocalStorage() {
    const jsonFormatData = localStorage.getItem("Tasks");
    console.log(jsonFormatData);
    if (jsonFormatData) {
      const todos = JSON.parse(jsonFormatData);
      setDataParsed(todos);
      setIsData(true);
    }
  }

  function onAddClick(taskname, assignee) {
    let dataObject = {
      id: dataParsed.length,
      done: false,
      taskname,
      assignee,
    };

    const updatedData = [...dataParsed, dataObject];
    const localStorageData = parsingData(updatedData);

    setDataParsed(updatedData);
    localStorage.setItem("Tasks", localStorageData);
    showSuccessPopup();
  }

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
    setIsData(false);
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
      setIsData(false);
      setIsData(true); // Trigger re-render
    });
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, [isData]);

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
