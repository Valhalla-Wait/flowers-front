import { createContext, useContext } from "react";

type MobileMenuContextType = {
  isCollapse: boolean;
  toggleCollapse: () => void;
  closeCollapse: () => void;
};

export const MobileMenuContext = createContext<
  MobileMenuContextType | undefined
>(undefined);

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }
  return context;
};
