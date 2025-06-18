import './TaskList.css'

function TaskList(props) {
    return(
        <div className={`task-header ${props.color}`}>
            <span className="task-title">{props.title}</span>
            <button className="dots-btn">⋮</button>
            <div className="dropdown-menu">
                <a href="#">Редактировать</a>
                <a href="#">Удалить</a>
            </div>
        </div>
    )
    
}

export default TaskList