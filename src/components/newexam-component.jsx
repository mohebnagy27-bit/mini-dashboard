import { useRef, useContext } from "react"
import { Examcontext } from "../contexts/exam-context"

export default function Newexam() {
  const subjectref = useRef()
  const dateref = useRef()
  const noteref = useRef()

  const { examlistset } = useContext(Examcontext)

  function handlesave(e) {
    e.preventDefault()
    if (!subjectref.current.value.trim()) { alert("Subject is required"); return }
    if (!dateref.current.value) { alert("Date is required"); return }

    const exam = {
      subject: subjectref.current.value.trim(),
      date: dateref.current.value,
      note: noteref.current.value.trim(),
      completed: false,
    }

    examlistset(prev => {
      const updated = [...prev, exam].sort((a, b) => new Date(a.date) - new Date(b.date))
      localStorage.setItem("examlist", JSON.stringify(updated))
      return updated
    })

    subjectref.current.value = ""
    dateref.current.value = ""
    noteref.current.value = ""
  }

  return (
    <div className="exam-form-card">
      <h4>Add New Exam</h4>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="exam-subject">Subject</label>
          <input
            ref={subjectref}
            className="form-input"
            type="text"
            id="exam-subject"
            placeholder="e.g. Mathematics"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="exam-date">Exam Date</label>
          <input
            ref={dateref}
            className="form-input"
            type="date"
            id="exam-date"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="exam-note">Notes (optional)</label>
          <textarea
            ref={noteref}
            className="form-textarea"
            id="exam-note"
            placeholder="Topics to revise..."
          />
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handlesave}>
          Add Exam
        </button>
      </form>
    </div>
  )
}
