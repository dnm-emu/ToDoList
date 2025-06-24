import './Auth.css';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';


function Reg() {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('https://todolist-rhhd.onrender.com/register', {
        "first_name": firstname,
        "last_name": lastname,
        "username": username,
        "password": password
      });
      console.log(firstname, lastname, username, password);
      console.log('Успешная регистрация', response.data);
      setSuccess('Регистрация прошла успешно!');
      setError('');
    } catch (err) {
      console.log(firstname, lastname, username, password);
      console.error('Ошибка регистрации', err);
      setError('Ошибка при регистрации');
      setSuccess('');
    }
  };

  return (
    <div className='auth-page'>
      <div className="container">
        <div className="main">
          <div className="form-container">
            <h1>Регистрация</h1>
            <a href="/">Вернуться к авторизации</a>
            <form onSubmit={handleRegister}>
              <label>Firstname</label>
              <Input type="text" value={firstname} onChange={(e) => {
                setFirstname(e.target.value)
              }} />

              <label>Lastname</label>
              <Input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />

              <label>Username</label>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

              <label htmlFor="password">Пароль</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <Button value="Зарегистрироваться" type="submit" />

              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reg;