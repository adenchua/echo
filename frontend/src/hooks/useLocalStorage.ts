import { useState } from "react";

interface LocalStorageInterface {
  storedValue: string;
  setValueInStorage: (newValue: string) => void;
}

export function useLocalStorage(key: string, initialValue: string): LocalStorageInterface {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValueInStorage = (value: string) => {
    try {
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // do nothing
    }
  };
  return { storedValue, setValueInStorage };
}
