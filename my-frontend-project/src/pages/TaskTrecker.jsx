import './TaskTrecker.css'
import TaskList from "../components/TaskList"
import Task from '../components/Task'
import ModalTask from '../components/ModalTask'
import { useState } from 'react'

function TaskTrecker() {
    const tasks = [
        {text: "выпить кофе", time: "15:00", done: false, type: "Семья", priority: 1, color: "gray"}, 
        {text: "Сделать сальто", time: "15:00", done: false, type: "Работа", priority: 1, color: "purple"}, 
        {text: "Поработать", time: "16:00", done: false, type: "Работа", priority: 1, color: "green"}
    ];

    const list = [
        { list: "Все задачи", color : "gray"} ,
        { list: "Семья", color : "purple"},
        { list: "Работа", color : "green"}
    ];

    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <div className='Trecer-page'>
            <div className="list">
                {list.map((elem, i) => (
                    <div className='tasks' key={i}>
                        <TaskList color={elem.color} title={elem.list} />
                        {tasks
                            .filter(e => elem.list === "Все задачи" || e.type === elem.list)
                            .map((task, index) => (
                                <div key={index} onClick={() => setSelectedTask(task)}>
                                    <Task text={task.text} time={task.time} />
                                </div>
                            ))
                        }
                        <button className='plus-task-btn' onClick={() => setSelectedTask({})}>+</button>
                    </div>
                ))}
                <button className='plus-btn'>+</button>
            </div>

            {selectedTask && (
                <ModalTask 
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)} 
                />
            )}
        </div>
    );
}

export default TaskTrecker;