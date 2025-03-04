import React, { createContext, useContext, useState } from "react";

const EditingContext = createContext();

export const EditingProvider = ({ children }) => {
  const [editingStatus, setEditingStatus] = useState({});

  const toggleEditing = (articleId, isEditing) => {
    setEditingStatus((prev) => ({
      ...prev,
      [articleId]: isEditing,
    }));
  };

  return (
    <EditingContext.Provider value={{ editingStatus, toggleEditing }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => {
  return useContext(EditingContext);
};
