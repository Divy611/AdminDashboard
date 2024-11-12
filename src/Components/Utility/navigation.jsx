import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navigationStack, setNavigationStack] = useState([]);

  const navigate = (path) => {
    setNavigationStack((prevStack) => [...prevStack, path]);
    window.location.pathname = path;
  };

  const goBack = () => {
    setNavigationStack((prevStack) => {
      const newStack = prevStack.slice(0, -1);
      const previousPath = newStack[newStack.length - 1] || '/';
      window.location.pathname = previousPath;
      return newStack;
    });
  };

  return (
    <NavigationContext.Provider value={{ navigate, goBack }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
