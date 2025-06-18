import './ModalTask.css'

function ModalTask({ task, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-window" onClick={e => e.stopPropagation()}>
                <h2>Задача</h2>
                {task.text ? (
                    <>
                        <p><strong>Текст:</strong> {task.text}</p>
                        <p><strong>Время:</strong> {task.time}</p>
                        <p><strong>Тип:</strong> {task.type}</p>
                    </>
                ) : (
                    <p>Создание новой задачи</p>
                )}
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default ModalTask;