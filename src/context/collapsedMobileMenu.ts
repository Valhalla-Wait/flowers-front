import { createContext } from "react";

export const CollapsedMobileMenuContext = createContext({
  collapsed: true,
  toggleCollapsed: () => {},
});
