"use client";

import { createContext, useContext } from "react";

interface GeneralPageContextType {
  currentStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  handleBack: () => void;
}

const GeneralPageContext = createContext<GeneralPageContextType | null>(null);

export const useGeneralPageContext = () => {
  const context = useContext(GeneralPageContext);
  if (!context) {
    throw new Error("useGeneralPageContext must be used within GeneralLayout");
  }
  return context;
};

export { GeneralPageContext };

