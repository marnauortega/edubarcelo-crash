"use client";

import { useContext } from "react";
import { CartContext } from "@/Providers/CartProvider";
import Button from "../Button/Button";

const AddToCartButton = ({ children, productId, small, ...delegated }) => {
  const { addToCart, setCartOpen } = useContext(CartContext);

  return (
    <Button
      onClick={() => {
        addToCart(productId);
        setCartOpen(true);
      }}
      small={small}
      {...delegated}
    >
      {children}
    </Button>
  );
};

export default AddToCartButton;
