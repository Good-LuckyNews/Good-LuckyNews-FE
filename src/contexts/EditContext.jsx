import React, { createContext, useContext, useState } from "react";

const EditingContext = createContext();

export const EditingProvider = ({ children }) => {
  const [editingStatus, setEditingStatus] = useState({});
  const [scoreStatus, setScoreStatus] = useState({});

  const toggleEditing = (articleId, isEditing) => {
    setEditingStatus((prev) => ({
      ...prev,
      [articleId]: isEditing,
    }));
  };

  const updateScore = (articleId, score) => {
    setScoreStatus((prev) => ({
      ...prev,
      [articleId]: score,
    }));
  };

  return (
    <EditingContext.Provider value={{ editingStatus, toggleEditing, scoreStatus, updateScore }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => {
  return useContext(EditingContext);
};
