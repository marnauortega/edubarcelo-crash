"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import styles from "./ThemeToggler.module.css";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.hiddenToggler}></div>;
  }

  const handleClick = () => {
    resolvedTheme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Image onClick={handleClick} className={styles.toggler} src={"/themeToggler.svg"} width={27} height={27} alt="" />
  );
};

export default ThemeToggler;
