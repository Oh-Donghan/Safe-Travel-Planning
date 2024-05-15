import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { auth } from '../firebase';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import LoadingScreen from './components/LoadingScreen';
import { router } from './route';
// import TravelAlarmLogger from './components/alert';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className=' bg-my-bg dark:bg-my-text text-my-text dark:text-my-bg h-screen'>
      <GlobalStyled />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      {/* <TravelAlarmLogger /> */}
    </div>
  );
}

export default App;

const GlobalStyled = createGlobalStyle`
    ${reset};
    * {
      box-sizing: border-box;
    }
    body {
      /* background-color: #333D79; */
      /* color: #FAEBEF; */
      
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  `;

// const Wrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
// `;
