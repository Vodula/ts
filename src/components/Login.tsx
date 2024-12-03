import { SyntheticEvent, useState } from 'react';
import LabelWithInput from './LabelWithInput';
import axios from 'axios';
import useLocalStorage from '../effects/useLocalStorage';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useLocalStorage('token', '');
    const navigate = useNavigate();

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        try {
            const response = await axios.post(`https://dogs.kobernyk.com/login`, {
                username,
                password,
            });
            if (response.data && response.data.token) {
                setToken(response.data.token);
                console.log('token is set', response.data.token)
                console.log('Успішна авторизація:', response.data);
                setTimeout(() => navigate('/'), 10);
                alert('авторизація успішна')
            } else {
                console.error('Помилка: відсутній токен у відповіді сервера.');
            }
        } catch (error) {
            console.error('Помилка авторизації:', error);
        }
    }

    return (
        <>
            <h1>Сторінка авторизації</h1>
            <form onSubmit={onSubmit}>
                <LabelWithInput
                    type="text"
                    name="username"
                    labeltext="Ім'я користувача"
                    value={username}
                    onChange={(value) => setUsername(value)}
                />
                <LabelWithInput
                    type="password"
                    name="password"
                    labeltext="Пароль"
                    value={password}
                    onChange={(value) => setPassword(value)}
                />
                <br />
                <button type="submit">Увійти</button>
            </form>
        </>
    );
};

export default Login;