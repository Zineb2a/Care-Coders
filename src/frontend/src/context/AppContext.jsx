import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(null); // Store only patient ID

  return (
    <AppContext.Provider value={{ patientId, setPatientId }}>
      {children}
    </AppContext.Provider>
  );
};
