import React from "react";
import Tasks from "./Tasks";

export default function TaskList({
  dataParsed,
  onComplete,
  onNotComplete,
  onDelete,
  toggle,
  token,
}) {
  return (
    <div className="tasksTable">
      <div id="tasksTable" className="tasks-table-container">
        <Tasks
          tasks={dataParsed}
          onComplete={onComplete}
          onNotComplete={onNotComplete}
          onDelete={onDelete}
          toggle={toggle}
          token={token}
        />
      </div>
    </div>
  );
}
