import { createContext, useContext, useState } from "react";

const ScrapContext = createContext();

export const ScrapProvider = ({ children }) => {
  const [scrapStatus, setScrapStatus] = useState({});

  const toggleScrap = (articleId, isScrapped) => {
    setScrapStatus((prev) => ({
      ...prev,
      [articleId]: isScrapped,
    }));
  };

  return (
    <ScrapContext.Provider value={{ scrapStatus, toggleScrap }}>
      {children}
    </ScrapContext.Provider>
  );
};

export const useScrap = () => {
  return useContext(ScrapContext);
};