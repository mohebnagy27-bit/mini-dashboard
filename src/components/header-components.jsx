export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="header">
      <div className="header-left">
        <h1>Welcome back 👋</h1>
        <p>Stay focused — you're doing great</p>
      </div>
      <span className="header-date">{today}</span>
    </div>
  )
}
