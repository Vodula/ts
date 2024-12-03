import { useState, useEffect } from "react";

function useLocalStorage(key: string, initialValue: any) {
  // Зчитування значення з localStorage при першому рендерингу
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue; // Якщо виникла помилка, використовуємо початкове значення
    }
  });

  // Збереження значення в localStorage при його зміні
  useEffect(() => {
    console.log('triggered effect', value)
    try {
        console.log(value);
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error saving to localStorage:", key, error);
    }
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
