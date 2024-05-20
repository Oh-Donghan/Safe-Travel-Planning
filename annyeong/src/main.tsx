import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DarkModeProvider } from './store/DarkModeContext';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </RecoilRoot>
  </React.StrictMode>
);