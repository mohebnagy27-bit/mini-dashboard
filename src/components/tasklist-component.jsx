import { useContext, useState } from "react"
import { Taskcontext } from "../contexts/task-context"
import { Getdaysleft } from "../helper-functions"
import SHmore from "./shmore-component"

export default function Tasklist() {
  const { tasklist, tasklistset } = useContext(Taskcontext)
  const [details, setdetails] = useState(null)

  function handledelete(e, index) {
    e.stopPropagation()
    tasklistset(prev => {
      const updated = prev.filter((_, i) => i !== index)
      localStorage.setItem("tasklist", JSON.stringify(updated))
      return updated
    })
  }

  function handlecomplete(index) {
    tasklistset(prev => {
      const updated = prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
      localStorage.setItem("tasklist", JSON.stringify(updated))
      return updated
    })
  }

  function handledetails(e, index) {
    e.stopPropagation()
    setdetails(prev => (prev === index ? null : index))
  }

  function getBadge(deadline, completed) {
    if (completed) return null
    const days = Getdaysleft(deadline)
    if (days === 0) return <span className="task-badge badge-today">Due Today</span>
    if (days === 1) return <span className="task-badge badge-soon">Tomorrow</span>
    if (days < 0) return <span className="task-badge badge-soon">Overdue</span>
    return <span className="task-badge badge-default">{days}d left</span>
  }

  const isToday = (deadline) =>
    new Date().toDateString() === new Date(deadline).toDateString()

  return (
    <div className="tasks">
      <div className="section-header">
        <span className="section-title">Your Tasks</span>
        <span className="section-count">{tasklist.length} total</span>
      </div>

      {tasklist.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>No tasks yet. Add your first task!</p>
        </div>
      )}

      {tasklist.map((task, index) => (
        <div
          key={index}
          className={`task-item ${task.completed ? "completed" : ""} ${isToday(task.deadline) && !task.completed ? "today" : ""}`}
          onClick={() => handlecomplete(index)}
        >
          <div className="task-checkbox">
            {task.completed && "✓"}
          </div>

          <span className="task-name">📘 {task.name}</span>

          {getBadge(task.deadline, task.completed)}

          <div className="task-actions">
            <button
              className="btn btn-ghost btn-sm btn-icon"
              title="Details"
              onClick={(e) => handledetails(e, index)}
            >
              {details === index ? "▲" : "▼"}
            </button>
            <button
              className="btn btn-danger btn-sm btn-icon"
              title="Delete"
              onClick={(e) => handledelete(e, index)}
            >
              ✕
            </button>
          </div>

          {details === index && (
            <SHmore note={task.note} deadline={task.deadline} />
          )}
        </div>
      ))}
    </div>
  )
}
