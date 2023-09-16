"use client";

import { createContext, useState, useEffect } from "react";
import { getCart } from "@/lib/swell/queries/cart";
import { cartLinesAdd } from "@/lib/swell/queries/cartLinesAdd";
import { cartLinesRemove } from "@/lib/swell/queries/cartLinesRemove";
// import { createCart } from "@/lib/swell/queries/createCart";
import { cartLinesUpdate } from "@/lib/swell/queries/cartLinesUpdate";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [cartId, setCartId] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const nextCartId = localStorage.getItem("cartId");
    setCartId(nextCartId);

    // If there's cartId, getCart; otherwise createCart (also by getCart)
    const cartFetcher = async (cartId) => {
      const { cart: newCart, session } = await getCart(cartId);
      if (session) {
        // setCartId only if getCart retrieved a session
        // sessions are only retrieved if none existed previously (I think)
        setCartId(session);
        localStorage.setItem("cartId", session);
      }
      if (newCart) setCart(newCart);
    };
    cartFetcher(nextCartId);
  }, []);

  async function addToCart(productId) {
    setCartOpen(true);
    setCartLoading(true);
    console.log(productId, cartId);
    const { cart: newCart, session } = await cartLinesAdd(1, productId, cartId);
    setCart(newCart);
    if (session) {
      setCartId(session);
      localStorage.setItem("cartId", session);
    }
    console.log("cart", newCart, "session", session, "current session in state", cartId);
    setCartLoading(false);
    // if (cartId) {
    // } else {
    //   setCartLoading(true);
    //   const newCart = await createCart(1, variantId, locale);
    //   localStorage.setItem("cartId", newCart.id);
    //   setCart(newCart);
    //   setCartLoading(false);
    // }
  }

  async function incrementCartItem(quantity, itemId) {
    setCartLoading(true);
    const { cart: newCart, session } = await cartLinesUpdate(quantity + 1, itemId, cartId);
    setCart(newCart);
    if (session) {
      setCartId(session);
      localStorage.setItem("cartId", session);
    }
    console.log("cart", newCart, "session", session, "current session in state", cartId);
    setCartLoading(false);
  }

  async function decrementCartItem(quantity, itemId) {
    setCartLoading(true);
    let newCart;
    if (quantity > 1) {
      const { cart: newCart, session } = await cartLinesUpdate(quantity - 1, itemId, cartId);
      setCart(newCart);
      if (session) {
        setCartId(session);
        localStorage.setItem("cartId", session);
      }
    } else {
      const { cart: newCart, session } = await cartLinesRemove(itemId, cartId);
      setCart(newCart);
      if (session) {
        setCartId(session);
        localStorage.setItem("cartId", session);
      }
    }
    console.log("cart", newCart, "session", session, "current session in state", cartId);
    setCartLoading(false);
  }

  async function removeCartItem(itemId) {
    setCartLoading(true);
    const { cart: newCart, session } = await cartLinesRemove(itemId, cartId);
    setCart(newCart);
    if (session) {
      setCartId(session);
      localStorage.setItem("cartId", session);
    }
    console.log("cart", newCart, "session", session);
    setCartLoading(false);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartOpen,
        setCartOpen,
        incrementCartItem,
        decrementCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
