"use client";

import MenuToggler from "@/components/MenuToggler/MenuToggler";
import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";
import Cart from "@/components/Cart/Cart";
import MainMenu from "@/components/MainMenu/MainMenu";
import Link from "next/link";
import { useContext } from "react";
import { MenuContext } from "@/Providers/MenuProvider";
import { usePathname } from "next/navigation";

import styles from "./HeaderAndMenu.module.css";

const HeaderAndMenu = () => {
  const { headerAndMenuHidden } = useContext(MenuContext);
  //   TODO: Using unnecessarily pathname because headerAndMenuHidden was unexpectedly set to true when navigating from home to projects
  //   (but pathname IS necessary for wether sticky or fixed)
  const pathname = usePathname();
  const hidden = pathname === "/" && headerAndMenuHidden ? styles.hidden : undefined;

  return (
    <>
      <div className={`${styles.header} ${pathname === "/" ? styles.fixed : undefined} ${hidden}`}>
        <h2>
          <Link href="/">Edu Barceló</Link>
        </h2>
        <MenuToggler />
      </div>
      <div className={`${styles.cartAndThemeToggler} ${hidden}`}>
        <Cart />
        <ThemeToggler />
      </div>
      <MainMenu hiddenInHome={hidden} />
    </>
  );
};

export default HeaderAndMenu;
