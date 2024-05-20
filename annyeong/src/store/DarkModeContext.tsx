import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type DarkContext = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const defaultState = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const DarkModeContext = createContext<DarkContext>(defaultState);

export function useDarkMode() {
  return useContext(DarkModeContext);
}

type DarkModeProps = {
  children: ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
