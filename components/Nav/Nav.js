"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import styles from "./Nav.module.css";

const Nav = ({ categories }) => {
  const [filteredCategory, setFilteredCategory] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    if (searchParams.get("category")) setFilteredCategory(searchParams.get("category"));
  }, []);

  return (
    <h3 className={`h2 ${styles.nav}`}>
      <span
        onClick={() => {
          setFilteredCategory("");
          setSearchParams("");
        }}
        className={`${styles.category} ${filteredCategory === "all" ? styles.active : undefined}`}
      >
        All,{" "}
      </span>
      {categories.map((category, index, array) => (
        <span
          key={category.slug}
          onClick={() => {
            setFilteredCategory(category.slug);
            setSearchParams(category.slug);
          }}
          className={`${styles.category} ${filteredCategory === category.slug ? styles.active : undefined}`}
        >
          {category.name}
          {index < array.length - 1 ? ", " : undefined}
        </span>
      ))}
    </h3>
  );
};

export default Nav;
