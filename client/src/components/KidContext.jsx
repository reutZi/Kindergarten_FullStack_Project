import React, { createContext, useContext, useState } from 'react';

const KidContext = createContext();

export const useKid = () => useContext(KidContext);

export const KidProvider = ({ children }) => {
  const [selectedKid, setSelectedKid] = useState(null);
  const [kindergartenId, setKindergartenId] = useState(null);

  return (
    <KidContext.Provider value={{ selectedKid, setSelectedKid, kindergartenId, setKindergartenId }}>
      {children}
    </KidContext.Provider>
  );
};
