import React, { createContext, useContext, useState } from 'react';

const ShabbatContext = createContext(null);

export const ShabbatProvider = ({ children }) => {
  const [shabbatDetails, setShabbatDetails] = useState({
    time: '',
    place: 'בבית',
    meals: [], // changed to array to support multiple selections
    hospitality: 'לבד בבית'
  });

  return (
    <ShabbatContext.Provider value={{ shabbatDetails, setShabbatDetails }}>
      {children}
    </ShabbatContext.Provider>
  );
};

export const useShabbat = () => {
  const ctx = useContext(ShabbatContext);
  if (!ctx) throw new Error('useShabbat must be used inside ShabbatProvider');
  return ctx;
};
