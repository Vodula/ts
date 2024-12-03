import { Link } from 'react-router-dom';
import useLocalStorage from '../effects/useLocalStorage';

const Main = () => {
  const [token, setToken] = useLocalStorage('token', '');

  const handleLogout = () => {
    setToken(''); // Видаляємо токен
    alert('Ви вийшли з облікового запису.');
  };

  return (
    <>
      {token ? (
        <>
          <p>Ви вже авторизовані!</p>
          <button onClick={handleLogout}>Вийти</button>
        </>
      ) : (
        <>
          <Link to="/login">Увійти</Link>
          <br />
        </>
      )}
    </>
  );
};

export default Main;
