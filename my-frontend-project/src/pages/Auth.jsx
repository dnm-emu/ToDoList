import './Auth.css';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://127.0.0.1:8000/login', {
        "username": username,
        "password": password
      });

      /* ----------------  успех  ---------------- */
      localStorage.setItem('token', data.access_token); // сохранили токен
      setError('');
      navigate('/');                                    // переходим на TaskTrecker ("/")
    } catch (err) {
      console.error('Ошибка входа', err);
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="main">
          <div className="form-container">
            <h1>Вход</h1>

            <form onSubmit={handleLogin}>
              <label>Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button value="Войти" type="submit" />

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <p className="switch">
                Нет аккаунта? <a href="/reg">Зарегистрироваться</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;