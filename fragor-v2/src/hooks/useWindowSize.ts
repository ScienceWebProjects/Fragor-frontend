import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const handleWindowResize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Add listener for window resize event on component assembly
    window.addEventListener('resize', handleWindowResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return { windowHeight, windowWidth };
};
