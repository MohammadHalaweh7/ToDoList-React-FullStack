import React, { useState } from "react";

export default function Modal({ onAddClick }) {
  const [taskname, setTaskName] = useState();
  const [assignee, setAssignee] = useState();

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Task
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="taskname"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">Task Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="assignee"
                onChange={(e) => {
                  setAssignee(e.target.value);
                }}
              />
              <label htmlFor="floatingInput">Assignee</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => {
                onAddClick(taskname, assignee);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
