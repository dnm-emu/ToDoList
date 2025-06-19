import { useEffect, useRef, useState } from 'react';
import ListModal from './ListModal';
import './TaskList.css'


function TaskList(props) {
    const [showMenu, setShowMenu] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleEdit = () => {
        setShowEditModal(true);
        setShowMenu(false);
    };

    const handleUpdateCategory = async (updated) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/categories/${updated.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: updated.name,
                    color: updated.color,
                }),
            });
            const data = await response.json();
            console.log('Категория обновлена:', data);
            setShowEditModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/categories/${props.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log('Удалено:', data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={`task-header ${props.color}`}>
            <span className="task-title">{props.title}</span>
            <div className="dropdown" ref={menuRef}>
                <button className="dots-btn" onClick={() => setShowMenu(!showMenu)}>⋮</button>
                {showMenu && (
                    <div className="dropdown-menu">
                        <button onClick={handleEdit}>Редактировать</button>
                        <button onClick={handleDelete}>Удалить</button>
                    </div>
                )}
            </div>
            {showEditModal && (
                <ListModal
                    onClose={() => setShowEditModal(false)}
                    onCreate={handleUpdateCategory}
                    editMode={true}
                    initialData={{ id: props.id, name: props.title, color: props.color }}
                />
            )}
        </div>
    )
}

export default TaskList