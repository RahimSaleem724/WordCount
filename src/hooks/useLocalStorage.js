import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to synchronize state with localStorage with debounced saving (500ms),
 * robust try/catch handling, and a 'justSaved' notification indicator.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default fallback value
 * @param {number} [debounceMs=500] - debounce delay in ms
 * @returns {[*, Function, boolean]} [storedValue, setValue, isSaved]
 */
export function useLocalStorage(key, initialValue, debounceMs = 500) {
  // Retrieve initial value from localStorage
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const [isSaved, setIsSaved] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Avoid marking as newly saved on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setIsSaved(true);
        const timer = setTimeout(() => {
          setIsSaved(false);
        }, 1800);
        return () => clearTimeout(timer);
      } catch (error) {
        console.warn(`Error saving to localStorage key "${key}":`, error);
      }
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [key, value, debounceMs]);

  return [value, setValue, isSaved];
}
