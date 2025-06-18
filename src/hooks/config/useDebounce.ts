import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { value: debouncedValue, isDebouncing };
};

export default useDebounce;
