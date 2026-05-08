import { useContext, useRef } from "react"
import { Taskcontext } from "../contexts/task-context"
import { Reducercontext } from "../contexts/reducer-context"

export default function Newtask() {
  const nameref = useRef()
  const deadlineref = useRef()
  const noteref = useRef()

  const { tasklistset } = useContext(Taskcontext)
  const { btnselecteddispatch } = useContext(Reducercontext)

  function handlesave(e) {
    e.preventDefault()
    if (!nameref.current.value.trim()) { alert("Task name is required"); return }
    if (!deadlineref.current.value) { alert("Deadline is required"); return }

    const task = {
      name: nameref.current.value.trim(),
      deadline: deadlineref.current.value,
      note: noteref.current.value.trim(),
      completed: false,
    }

    tasklistset(prev => {
      const updated = [...prev, task].sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      localStorage.setItem("tasklist", JSON.stringify(updated))
      return updated
    })

    btnselecteddispatch({ type: "" })
  }

  function handleclose(e) {
    e.preventDefault()
    btnselecteddispatch({ type: "" })
  }

  return (
    <dialog open>
      <div className="dialog-header">
        <h3>Add New Task</h3>
        <button className="dialog-close" onClick={handleclose} aria-label="Close">✕</button>
      </div>

      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="task-name">Task Name</label>
          <input
            ref={nameref}
            className="form-input"
            type="text"
            id="task-name"
            placeholder="e.g. Read Chapter 5"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-deadline">Deadline</label>
          <input
            ref={deadlineref}
            className="form-input"
            type="date"
            id="task-deadline"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-note">Notes (optional)</label>
          <textarea
            ref={noteref}
            className="form-textarea"
            id="task-note"
            placeholder="Any additional notes..."
          />
        </div>

        <div className="dialog-actions">
          <button className="btn btn-ghost" onClick={handleclose}>Cancel</button>
          <button className="btn btn-primary" onClick={handlesave}>Save Task</button>
        </div>
      </form>
    </dialog>
  )
}
