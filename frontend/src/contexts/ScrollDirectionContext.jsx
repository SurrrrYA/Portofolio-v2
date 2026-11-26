import React, { createContext, useContext, useEffect, useState } from 'react';

const ScrollDirectionContext = createContext('down');

export const ScrollDirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState('down');

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) > 6) {
        setDirection(currentY > lastY ? 'down' : 'up');
        lastY = currentY;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollDirectionContext.Provider value={direction}>
      {children}
    </ScrollDirectionContext.Provider>
  );
};

export const useScrollDirection = () => useContext(ScrollDirectionContext);
