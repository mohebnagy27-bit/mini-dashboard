import { useContext, useEffect, useState } from "react";
import { Getdaysleft, Todaytasks, Remainingtasks } from "../helper-functions";
import { Taskcontext } from "../contexts/task-context";
import { Examcontext } from "../contexts/exam-context";

export default function Cards() {
  const { tasklist } = useContext(Taskcontext)
  const { examlist } = useContext(Examcontext)
  const [rtoday, setrtoday] = useState([])
  const [nextexam, setnextexam] = useState(null)
  const [showTasks, setShowTasks] = useState(false)
  const [showExam, setShowExam] = useState(false)

  useEffect(() => {
    setrtoday(Remainingtasks(Todaytasks(tasklist)))
  }, [tasklist])

  useEffect(() => {
    const updated = examlist.map(exam => ({
      ...exam,
      remainingdays: Getdaysleft(exam.date),
    }))
    const next = updated.find(e => e.remainingdays >= 0 && !e.completed)
    setnextexam(next || null)
  }, [examlist])

  function daysLabel() {
    if (!nextexam) return ""
    if (nextexam.remainingdays === 0) return "Today!"
    if (nextexam.remainingdays === 1) return "1 day left"
    return `${nextexam.remainingdays} days left`
  }

  const todayAll = Todaytasks(tasklist)
  const completedCount = todayAll.length - rtoday.length
  const progress = Math.round((completedCount / todayAll.length) * 100) || 0

  return (
    <div className="cards">
      {/* Today's Tasks */}
      <div className="card" onClick={() => setShowTasks(p => !p)}>
        <div className="card-icon blue">📌</div>
        <h3>Today's Tasks</h3>
        <div className="card-value">{rtoday.length}</div>
        <p className="card-sub">remaining today</p>
        {showTasks && rtoday.length > 0 && (
          <div className="card-expand">
            <ul>
              {rtoday.map((task, i) => (
                <li key={i}>{task.name}</li>
              ))}
            </ul>
          </div>
        )}
        {showTasks && rtoday.length === 0 && (
          <div className="card-expand">
            <p style={{ fontSize: "13px", color: "var(--green)" }}>✓ All done!</p>
          </div>
        )}
      </div>

      {/* Next Exam */}
      <div className="card" onClick={() => setShowExam(p => !p)}>
        <div className="card-icon yellow">🎓</div>
        <h3>Next Exam</h3>
        <div className="card-value" style={{ fontSize: "18px", marginBottom: "4px" }}>
          {nextexam?.subject || "—"}
        </div>
        <p className="card-sub">
          {nextexam ? daysLabel() : "No upcoming exams"}
        </p>
        {showExam && nextexam && (
          <div className="card-expand">
            <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              📅 {nextexam.date}
            </p>
            {nextexam.note && (
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
                📝 {nextexam.note}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="card" style={{ cursor: "default" }}>
        <div className="card-icon green">📈</div>
        <h3>Today's Progress</h3>
        <div className="card-value">{progress}%</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
        <p className="card-sub">
          {completedCount} of {todayAll.length} tasks done
        </p>
      </div>
    </div>
  )
}
