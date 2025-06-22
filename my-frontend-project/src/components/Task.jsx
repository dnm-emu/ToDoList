import './Task.css'

function Task(props) {

  return (
    <div className="task-item">
      <div className={`task-type-indicator-${props.status}`}></div>
      <label className="task-content">
        <input type="checkbox" className="task-checkbox" />
        <span className="custom-radio" ></span>
        <span className="task-text">{props.text}</span>
        <span className="task-time">{props.time}</span>
      </label>
      <div className={`task-end-indicator-${props.priority}`}></div>
    </div>
  )
}

export default Task