import { useState, useEffect } from 'react';

/**
 * Hook to debounce any fast-changing value.
 *
 * @param {*} value
 * @param {number} delay - delay in milliseconds
 * @returns {*}
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
