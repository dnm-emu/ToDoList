import './ModalTask.css'
import { useState, useEffect } from 'react';
import Select from 'react-select'

function ModalTask({ task, onClose, tasktypes, triggerRefresh }) {
    const [text, setText] = useState(task.text || '');
    const [time, setTime] = useState(task.time || '');
    const [type, setType] = useState(task.type || '');
    const [list, setList] = useState(tasktypes)
    const options = tasktypes

    useEffect(() => {
        setText(task.text || '');
        setTime(task.time || '');
        setType(task.type || '');
    }, [task]);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const method = task.id ? 'PUT' : 'POST';
        const url = task.id
            ? `http://127.0.0.1:8000/tasks/${task.id}`
            : 'http://127.0.0.1:8000/tasks';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ text, time, type }),
            });

            if (response.ok) {
                console.log(`Задача ${task.id ? 'обновлена' : 'создана'}`);
                triggerRefresh();
                onClose();
            } else {
                console.error("Ошибка при сохранении задачи");
            }
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log("Задача удалена");
                triggerRefresh();
                onClose();
            } else {
                console.error("Ошибка при удалении задачи");
            }
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-window" onClick={e => e.stopPropagation()}>
                <h2>{task.text ? "Просмотр задачи" : "Создание новой задачи"}</h2>
                <label>
                    Текст:
                    <input type="text" value={text} onChange={e => setText(e.target.value)} />
                </label>
                <label>
                    Время:
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                </label>
                <label>
                    Тип:
                    <Select
                        options={options.map(option => ({ value: option.name, label: option.name }))}
                        value={options.map(option => ({ value: option.name, label: option.name })).find(o => o.value === type)}
                        onChange={(selected) => setType(selected.value)}
                    />

                    
                </label>
                <div className="modal-actions">
                    {task.id && <button onClick={handleDelete}>Удалить</button>}
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={handleSubmit}>Сохранить</button>
                </div>
            </div>
        </div>
    );
}

export default ModalTask;