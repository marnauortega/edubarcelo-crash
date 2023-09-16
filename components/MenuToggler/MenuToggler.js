"use client";

import { useContext } from "react";
import { MenuContext } from "@/Providers/MenuProvider";
import { usePathname } from "next/navigation";

import styles from "./MenuToggler.module.css";

const MenuToggler = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);

  const pathname = usePathname();

  return (
    <div
      className={`h2 ${styles.menuToggler} ${pathname === "/info" ? styles.hidden : undefined}`}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? "Close" : "More"}
    </div>
  );
};

export default MenuToggler;
