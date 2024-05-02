import { useState, useEffect } from 'react';

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastUpdated;

      if (timeElapsed >= delay) {
        setThrottledValue(value);
        setLastUpdated(now);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, lastUpdated]);

  return throttledValue;
};

export default useThrottle;
