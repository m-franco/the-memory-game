import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GameSessionContextType {
  selectedGameSessionId: string | null;
  setSelectedGameSessionId: (id: string | null) => void;
  selectedMemoTestId: string | null;
  setSelectedMemoTestId: (id: string | null) => void;
}

const GameSessionContext = createContext<GameSessionContextType>({
  selectedGameSessionId: null,
  setSelectedGameSessionId: () => {},
  selectedMemoTestId: null,
  setSelectedMemoTestId: () => {},
});

export const useGameSessionContext = () => useContext(GameSessionContext);

export const GameSessionProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  const [selectedGameSessionId, setSelectedGameSessionId] = useState<string | null>(null);
  const [selectedMemoTestId, setSelectedMemoTestId] = useState<string | null>(null);

  return (
    <GameSessionContext.Provider value={{ selectedGameSessionId, setSelectedGameSessionId, 
                                          selectedMemoTestId, setSelectedMemoTestId }}>
      {children}
    </GameSessionContext.Provider>
  );
};