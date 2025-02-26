import React, { useEffect, useState } from 'react';

export function useLocalStorage(key, initialData) {
  const [localStorageData, setLocalStorageData] = useState(() => {
    const existingData = localStorage.getItem(key);
    return existingData ? JSON.parse(existingData) : initialData;
  });

  useEffect(() => {
    const existingData = localStorage.getItem(key);
    if (!existingData) {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, [key, initialData]);

  const updateLocalStorage = (newData) => {
    const dataToStore =
      typeof newData === 'function' ? newData(localStorageData) : newData;
    localStorage.setItem(key, JSON.stringify(dataToStore));
    setLocalStorageData(dataToStore);
  };

  return [localStorageData, updateLocalStorage];
}

