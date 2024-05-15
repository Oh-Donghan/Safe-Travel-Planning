import { useLayoutEffect } from 'react';

const LOCAL_STORAGE_KEY = {
  THEME: 'theme',
} as const;

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const ThemeButton = () => {
  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME) || THEME.LIGHT;
    if (theme === THEME.DARK) {
      document.querySelector('html')?.classList.add(THEME.DARK);
    }
  }, []);

  const toggleTheme = () => {
    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains(THEME.DARK);
    if (enabledDarkMode) {
      htmlEl.classList.remove(THEME.DARK);
      localStorage.removeItem(LOCAL_STORAGE_KEY.THEME);
    } else {
      htmlEl.classList.add(THEME.DARK);
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
    }
  };

  return <button onClick={toggleTheme}>toggle theme</button>;
};

export default ThemeButton;
