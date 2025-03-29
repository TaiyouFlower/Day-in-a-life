"use client"
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [chromeVisible, setChromeVisible] = useState(false);
  const [telegramVisible, setTelegramVisible] = useState(false);

  return (
    <AppContext.Provider
      value={{
        chromeVisible,
        telegramVisible,
        openChrome: () => setChromeVisible(true),
        closeChrome: () => setChromeVisible(false),
        openTelegram: () => setTelegramVisible(true),
        closeTelegram: () => setTelegramVisible(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}