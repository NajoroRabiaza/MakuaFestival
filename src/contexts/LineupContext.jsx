import React, { createContext, useContext, useState, useEffect } from 'react';

const LineupContext = createContext(null);

export const LineupProvider = ({ children }) => {
  const [myLineup, setMyLineup] = useState(() => {
    try {
      const saved = localStorage.getItem('makua_lineup');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('makua_lineup', JSON.stringify(myLineup));
  }, [myLineup]);

  const addArtist = (artist) => {
    setMyLineup((prev) =>
      prev.find((a) => a.id === artist.id) ? prev : [...prev, artist]
    );
  };

  const removeArtist = (artistId) => {
    setMyLineup((prev) => prev.filter((a) => a.id !== artistId));
  };

  const toggleArtist = (artist) => {
    setMyLineup((prev) =>
      prev.find((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  };

  const isInLineup = (artistId) => myLineup.some((a) => a.id === artistId);

  const clearLineup = () => setMyLineup([]);

  return (
    <LineupContext.Provider
      value={{
        myLineup,
        isDrawerOpen,
        setIsDrawerOpen,
        addArtist,
        removeArtist,
        toggleArtist,
        isInLineup,
        clearLineup,
      }}
    >
      {children}
    </LineupContext.Provider>
  );
};

export const useLineup = () => {
  const context = useContext(LineupContext);
  if (!context) throw new Error('useLineup must be used within a LineupProvider');
  return context;
};