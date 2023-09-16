"use client";

import { useState, useEffect } from "react";
import Masonry from "@/components/Masonry/Masonry";
import MasonryAndLightbox from "@/components/MasonryAndLightbox/MasonryAndLightbox";
import { useSearchParams } from "next/navigation";

const FilteredItems = ({ items, categories, withLightbox = false }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam) {
      setFilteredItems(categories.find((category) => category.slug === categoryParam)?.products);
    } else {
      setFilteredItems(items);
    }
  }, [categoryParam]);

  return withLightbox ? (
    <MasonryAndLightbox projects={filteredItems} />
  ) : (
    <Masonry items={filteredItems} ofProducts={true} />
  );
};

export default FilteredItems;
