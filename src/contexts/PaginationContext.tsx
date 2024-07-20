import React, { createContext, useState, useEffect, useContext } from "react";

const PaginationContext = createContext();

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

const getOffset = () => {
  const savedOffset = localStorage.getItem("offset");
  return savedOffset ? Number(savedOffset) : 0;
};

const getLimit = () => {
  const savedLimit = localStorage.getItem("limit");
  return savedLimit ? Number(savedLimit) : 15;
};

export const PaginationProvider = ({ children }) => {
  const [offset, setOffset] = useState(getOffset);
  const [limit, setLimit] = useState(getLimit);

  useEffect(() => {
    localStorage.setItem("offset", offset.toString());
    localStorage.setItem("limit", limit.toString());
  }, [offset, limit]);

  return (
    <PaginationContext.Provider value={{ offset, limit, setOffset, setLimit }}>
      {children}
    </PaginationContext.Provider>
  );
};
