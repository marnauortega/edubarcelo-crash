"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import generateColumns from "@/lib/generateColumns";
import { useClosestMedia } from "@/lib/useClosestMedia";
import { useState, useEffect } from "react";

import styles from "./Masonry.module.css";

const Masonry = ({ items, ofProducts, setSelectedProject, setLightboxOpen }) => {
  const [itemColumns, setItemColumns] = useState([]);

  const sizes = [
    { name: "sm", value: "0px" },
    { name: "md", value: "640px" },
    { name: "lg", value: "900px" },
  ];

  const closestMedia = useClosestMedia(sizes);

  useEffect(() => {
    if (ofProducts) {
      if (closestMedia === "sm") {
        setItemColumns(generateColumns(items, 1));
      } else if (closestMedia === "md") {
        setItemColumns(generateColumns(items, 2));
      } else if (closestMedia === "lg") {
        setItemColumns(generateColumns(items, 3));
      }
    }

    if (!ofProducts) {
      if (closestMedia === "sm") {
        setItemColumns(generateColumns(items, 2));
      } else if (closestMedia === "md") {
        setItemColumns(generateColumns(items, 2));
      } else if (closestMedia === "lg") {
        setItemColumns(generateColumns(items, 3));
      }
    }
  }, [closestMedia, items]);

  return (
    <div className={styles.masonry}>
      {itemColumns?.map((column) => (
        <div key={column.id} className={styles.column}>
          {column.content.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              isProduct={ofProducts}
              isPriority={i < 2}
              onClick={(e) => {
                e.preventDefault();
                setSelectedProject(product.id);
                setLightboxOpen(true);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
