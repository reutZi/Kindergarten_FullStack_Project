import React, { createContext, useContext, useState, useEffect } from 'react';

const KidContext = createContext();

export const useKid = () => useContext(KidContext);

export const KidProvider = ({ children }) => {
  const [selectedKid, setSelectedKid] = useState(() => {
    // Retrieve the selectedKid from localStorage, if it exists
    const savedKid = localStorage.getItem('selectedKid');
    return savedKid ? JSON.parse(savedKid) : null;
  });

  const [kindergartenId, setKindergartenId] = useState(() => {
    // Retrieve the kindergartenId from localStorage, if it exists
    return localStorage.getItem('kindergartenId') || null;
  });

  useEffect(() => {
    // Store the selectedKid in localStorage whenever it changes
    if (selectedKid) {
      localStorage.setItem('selectedKid', JSON.stringify(selectedKid));
    }
  }, [selectedKid]);

  useEffect(() => {
    // Store the kindergartenId in localStorage whenever it changes
    if (kindergartenId) {
      localStorage.setItem('kindergartenId', kindergartenId);
    }
  }, [kindergartenId]);

  return (
    <KidContext.Provider value={{ selectedKid, setSelectedKid, kindergartenId, setKindergartenId }}>
      {children}
    </KidContext.Provider>
  );
};
