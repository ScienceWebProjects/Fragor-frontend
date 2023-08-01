// hooks
import React, { useState, useEffect } from 'react';

function useWindowSize() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleWindowResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    // Add listener for window resize event on component assembly
    window.addEventListener('resize', handleWindowResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowHeight;
}

export default useWindowSize;
