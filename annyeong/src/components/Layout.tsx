import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import ThemeButton from '../ThemeButton';

export default function Layout() {
  const navigate = useNavigate();

  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <>
      <header>
        <button onClick={onLogOut}>Log out</button>
        <br />
        <ThemeButton />
      </header>
      <Outlet />
    </>
  );
}
