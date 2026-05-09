import { useContext, useEffect, useState } from "react"
import { Examcontext } from "../contexts/exam-context"
import SHmore from "./shmore-component"
import { Getdaysleft } from "../helper-functions"

export default function Examlist() {
  const { examlist, examlistset } = useContext(Examcontext)
  const [details, setdetails] = useState(null)

  function handledelete(e, index) {
    e.stopPropagation()
    examlistset(prev => prev.filter((_, i) => i !== index))
  }

  function handlecomplete(index) {
    examlistset(prev =>
      prev.map((exam, i) =>
        i === index ? { ...exam, completed: !exam.completed } : exam
      )
    )
  }

  function handledetails(e, index) {
    e.stopPropagation()
    setdetails(prev => (prev === index ? null : index))
  }

  function getBadge(date, completed) {
    if (completed) return <span className="task-badge badge-default">Done</span>
    const days = Getdaysleft(date)
    if (days === 0) return <span className="task-badge badge-today">Today</span>
    if (days === 1) return <span className="task-badge badge-soon">Tomorrow</span>
    if (days < 0) return <span className="task-badge badge-soon">Past</span>
    return <span className="task-badge badge-default">{days}d</span>
  }

  useEffect(() => localStorage.setItem("examlist", JSON.stringify(examlist)), [examlist])


  return (
    <div>
      <div className="section-header">
        <span className="section-title">Your Exams</span>
        <span className="section-count">{examlist.length} total</span>
      </div>

      {examlist.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎓</div>
          <p>No exams added yet.</p>
        </div>
      )}

      {examlist.map((exam, index) => (
        <div
          key={index}
          className={`exam-item ${exam.completed ? "completed" : ""}`}
          onClick={() => handlecomplete(index)}
        >
          <div className="exam-dot" />
          <span className="exam-name">📘 {exam.subject}</span>

          {getBadge(exam.date, exam.completed)}

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
            <SHmore note={exam.note} deadline={exam.date} />
          )}
        </div>
      ))}
    </div>
  )
}
