import { useState, useCallback } from "react";

interface LocalStorageInterface {
  storedValue: string;
  setValueInStorage: (newValue: string) => void;
  removeKeyValue: () => void;
}

export function useLocalStorage(key: string, initialValue: string): LocalStorageInterface {
  const storeInitialValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<string>(storeInitialValue);

  const setValueInStorage = useCallback(
    (value: string) => {
      try {
        setStoredValue(value);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // do nothing
      }
    },
    [key]
  );

  const removeKeyValue = useCallback(() => {
    window.localStorage.removeItem(key);
  }, [key]);

  return { storedValue, setValueInStorage, removeKeyValue };
}
