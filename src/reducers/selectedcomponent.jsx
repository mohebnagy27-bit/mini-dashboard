import Exams from "../components/exams-components"
import Newtask from "../components/newtask-component"
import { useContext } from "react"
import { Reducercontext } from "../contexts/reducer-context"

export default function Selectedcomponent() {
  const { btnselected, btnselecteddispatch } = useContext(Reducercontext)

  if (btnselected === "Ntask") return <Newtask />
  if (btnselected === "exams") return (
    <>
      <div
        className="panel-backdrop"
        onClick={() => btnselecteddispatch({ type: "" })}
      />
      <Exams />
    </>
  )
  return null
}
