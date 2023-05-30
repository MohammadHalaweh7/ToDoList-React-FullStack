import React from "react"
import Task from "./Task"

export default function Tasks({ tasks, onComplete, onDelete, toggle, token }) {
  let filteredTasks
  if (toggle) {
    filteredTasks = tasks.filter((task) => task.done === true)
  } else {
    filteredTasks = tasks.filter((task) => task.done === false)
  }

  if (token) {
    filteredTasks = tasks.filter((task) =>
      task.taskname?.toLowerCase().includes(token)
    )
    console.log(token)
  }

  return (
    <>
      {filteredTasks
        ? filteredTasks.map((task) => (
            <div key={task.id}>
              <Task
                {...task} 
                onComplete={onComplete}
                onDelete={onDelete}
                toggle={toggle}
              />
            </div>
          ))
        : ""}
    </>
  )
}
