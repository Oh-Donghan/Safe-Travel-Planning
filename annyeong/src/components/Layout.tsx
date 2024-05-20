import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import DarkModeBtn from './DarkModeBtn';
import styled from 'styled-components';

export default function Layout() {
  const navigate = useNavigate();
  const loginNow = auth.currentUser;

  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };

  return (
    <>
      <Header className='bg-my-text dark:bg-my-bg'>
        <DarkModeBtn />
        {loginNow ? (
          <LogOutBtn
            onClick={onLogOut}
            className='text-my-bg dark:text-my-text'
          >
            Log out
          </LogOutBtn>
        ) : null}
      </Header>
      <Outlet />
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  box-sizing: border-box;
`;

const LogOutBtn = styled.button`
  padding-right: 30px;
  font-weight: bold;
`;
