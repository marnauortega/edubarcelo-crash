"use client";

import { createContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [headerAndMenuHidden, setHeaderAndMenuHidden] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        infoOpen,
        setInfoOpen,
        headerAndMenuHidden,
        setHeaderAndMenuHidden,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
