import Newexam from "./newexam-component"
import Examlist from "./examlist-component"
import { useContext } from "react"
import { Reducercontext } from "../contexts/reducer-context"

export default function Exams() {
  const { btnselecteddispatch } = useContext(Reducercontext)

  return (
    <div className="exams-panel">
      <div className="exams-panel-header">
        <h2 className="exams-panel-title">📋 Exams</h2>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => btnselecteddispatch({ type: "" })}
        >
          ✕ Close
        </button>
      </div>
      <Newexam />
      <Examlist />
    </div>
  )
}
