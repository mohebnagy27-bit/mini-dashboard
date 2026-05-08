import { useContext, useState, useEffect } from "react"
import { Reducercontext } from "../contexts/reducer-context"

export default function Sidebar() {
  const { btnselected, btnselecteddispatch } = useContext(Reducercontext)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [btnselected])

  // Close on outside click
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setSidebarOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  function handleNav(type) {
    if (btnselected === type) {
      btnselecteddispatch({ type: "" })
    } else {
      btnselecteddispatch({ type })
    }
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="hamburger"
        onClick={() => setSidebarOpen(prev => !prev)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Backdrop (mobile only) */}
      {sidebarOpen && (
        <div className="panel-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">📚</div>
          <h2>StudyDesk</h2>
        </div>

        {/* Navigation */}
        <div>
          <p className="sidebar-section-label">Menu</p>
          <ul>
            <li
              className={`sidebar-nav-item ${btnselected === "Ntask" ? "active" : ""}`}
              onClick={() => btnselecteddispatch({ type: "Ntask" })}
            >
              <span className="nav-icon">＋</span>
              New Task
            </li>
            <li
              className={`sidebar-nav-item ${btnselected === "exams" ? "active" : ""}`}
              onClick={() => handleNav("exams")}
            >
              <span className="nav-icon">📋</span>
              Exams
            </li>
          </ul>
        </div>

        {/* Footer user */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">S</div>
            <div className="sidebar-user-info">
              <p>Student</p>
              <span>Stay focused 🎯</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
