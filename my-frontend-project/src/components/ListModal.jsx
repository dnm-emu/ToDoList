import React, { useEffect, useRef } from 'react';
import './ListModal.css';
import Select from 'react-select'

function ListModal({ onClose, onCreate }) {
    const [name, setName] = React.useState('');
    const [color, setColor] = React.useState('');
    const options = [
        { value: 'grey', label: 'Серый' },
        { value: 'purple', label: 'Фиолетовый' },
        { value: 'green', label: 'Зеленый' },
        { value: 'yellow', label: 'Желтый' },
        { value: 'orange', label: 'Оранжевый' }
]

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && color) {
            onCreate({ name, color });
            onClose();
        }
    };

    return (
        <div className="list-modal-overlay">
            <div className="list-modal" ref={modalRef}>
                <h2>Создать новую категорию</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название категории"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                        <Select
                        options={options}
                        value={options.find(opt => opt.value === color)}
                        onChange={(selected) => setColor(selected.value)}
                    />

                    <div className="modal-actions">
                        <button type="submit">Создать</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ListModal;