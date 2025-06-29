import './TaskTrecker.css'
import TaskList from "../components/TaskList"
import Task from '../components/Task'
import ModalTask from '../components/ModalTask'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ListModal from "../components/ListModal";


function TaskTrecker() {
    const [tasks, setTasks] = useState([]);
    const [sortTypes, setSortTypes] = useState({});

    const [list, setList] = useState([]);
    const [showListModal, setShowListModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const createCategory = async (category) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://todolist-rhhd.onrender.com/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                const newCategory = await response.json();
                setList(prev => [...prev, newCategory]);
            } else {
                console.error('Ошибка при создании категории');
            }
        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    };

    const createTask = async (task) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://todolist-rhhd.onrender.com/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks(prev => [...prev, newTask]);
            } else {
                console.error('Ошибка при создании задачи');
            }
        } catch (error) {
            console.error('Ошибка запроса при создании задачи:', error);
        }
    };

    const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://todolist-rhhd.onrender.com/tasks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTasks(data);
                } else {
                    console.error('Не удалось загрузить задачи');
                }
            } catch (error) {
                console.error('Ошибка запроса задач:', error);
            }
        };

        const fetchLists = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://todolist-rhhd.onrender.com/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setList(data);
                }
            } catch (error) {
                console.error('Ошибка запроса категорий:', error);
            }
        };
        fetchLists();
        fetchTasks();
    }, [refresh]);

    return (
        <div className='Trecer-page'>
            <button className='logout-btn' onClick={handleLogout}>Выход</button>
            <div className="list">
                {list.map((elem, i) => (
                    <div className='tasks' key={i}>
                        <TaskList color={elem.color} title={elem.name} id={elem.id} />
                        <div className="sort-options">
                            <label>Сортировать по: </label>
                            <select value={sortTypes[elem.name] || 'time'} onChange={e => setSortTypes(prev => ({ ...prev, [elem.name]: e.target.value }))}>
                                <option value="time">Времени</option>
                                <option value="priority">Приоритету</option>
                            </select>
                        </div>
                        {console.log(tasks)}
                        {tasks
                            .filter(e => elem.name === "Все задачи" || e.type === elem.name)
                            .sort((a, b) => {
                                const currentSort = sortTypes[elem.name] || 'time';
                                if (currentSort === 'time') {
                                    return a.time.localeCompare(b.time);
                                } else if (currentSort === 'priority') {
                                    return b.priority - a.priority;
                                }
                                return 0;
                            })
                            .map((task, index) => (
                                <div key={index} onClick={() => setSelectedTask(task)}>
                                    {console.log(list)}
                                    <Task text={task.text} time={task.time} tasktypes={list} status={task.status} priority={task.priority}/>
                                </div>
                            ))
                        }
                        <button className='plus-task-btn' onClick={() => setSelectedTask({})}>+</button>
                    </div>
                ))}
                <button className='plus-btn' onClick={() => setShowListModal(true)}>+</button>
            </div>

            {selectedTask && (
                <ModalTask
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onCreate={createTask}
                    tasktypes={list}
                    triggerRefresh={() => setRefresh(prev => !prev)}
                />
            )}
            {showListModal && (
                <ListModal
                    onClose={() => setShowListModal(false)}
                    onCreate={createCategory}
                />
            )}
        </div>
    );
}

export default TaskTrecker;