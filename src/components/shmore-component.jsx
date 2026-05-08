import { Getdaysleft } from "../helper-functions";

export default function SHmore({ note, deadline }) {
  const remainingdays = Getdaysleft(deadline)

  let daysText = ""
  if (remainingdays === 0) daysText = "Today!"
  else if (remainingdays === 1) daysText = "1 day left"
  else if (remainingdays > 1) daysText = `${remainingdays} days left`
  else daysText = "Past due"

  return (
    <div className="task-detail">
      <div className="task-detail-row">
        <span className="task-detail-label">Date</span>
        <span>{deadline}</span>
      </div>
      <div className="task-detail-row">
        <span className="task-detail-label">Remaining</span>
        <span style={{ color: remainingdays === 0 ? "var(--yellow)" : remainingdays < 0 ? "var(--red)" : "var(--text-secondary)" }}>
          {daysText}
        </span>
      </div>
      {note && (
        <div className="task-detail-row">
          <span className="task-detail-label">Note</span>
          <span>{note}</span>
        </div>
      )}
    </div>
  )
}
