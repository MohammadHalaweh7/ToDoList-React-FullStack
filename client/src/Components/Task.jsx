import React from "react"
export default function Task({
  id,
  taskname,
  assignee,
  onComplete,
  onDelete,
  done
}) {
  return (
    <div key={id}>
      <div className='taskDiv d-flex justify-content-between'>
        <div>
          <p>{taskname}</p>
          <p>{assignee}</p>
        </div>

        <div>
          <button
            onClick={() => onDelete(id)}
            type='button'
            className='btn btn-danger d-block mb-2'
          >
            <i className='fa-solid fa-trash-can'></i>
          </button>

          {!done ? (
            <button
              onClick={() => onComplete(id)}
              type='button'
              className='btn btn-success'
            >
              <i className='fa-solid fa-check'></i>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
