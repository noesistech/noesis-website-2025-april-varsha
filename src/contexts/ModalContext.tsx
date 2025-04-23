
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  inquiryFormOpen: boolean;
  toggleInquiryForm: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [inquiryFormOpen, setInquiryFormOpen] = useState(false);

  const toggleInquiryForm = () => {
    setInquiryFormOpen(prev => !prev);
  };

  return (
    <ModalContext.Provider
      value={{
        inquiryFormOpen,
        toggleInquiryForm
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
