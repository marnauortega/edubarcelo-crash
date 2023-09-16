"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useRef } from "react";
import { CartContext } from "@/Providers/CartProvider";
import Button from "../Button/Button";

import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, cartOpen, setCartOpen, removeCartItem } = useContext(CartContext);

  // const scrollArea = useRef(null);

  // let hiddenArrow;
  // if (cartOpen) {
  //   hiddenArrow =
  //     Math.abs(scrollArea.current.scrollHeight - scrollArea.current.scrollTop - scrollArea.current.clientHeight) < 1;
  //   console.log(
  //     scrollArea,
  //     scrollArea.current.scrollHeight,
  //     scrollArea.current.scrollTop,
  //     scrollArea.current.clientHeight
  //   );
  // }

  return (
    <>
      <span className={styles.cartToggler} onClick={() => setCartOpen(!cartOpen)}>
        {cart?.itemQuantity ?? 0}
        <Image className={styles.cartIcon} src={"/cart.svg"} width={26} height={27} alt="" />
        <Image className={styles.cartIconBg} src={"/cartBg.svg"} width={70} height={50} alt="" />
      </span>
      <div className={`${styles.cart} ${cartOpen ? undefined : styles.cartClosed}`}>
        <div className={styles.titleAndCloseWrapper}>
          <h2>Cart</h2>
          <Image
            onClick={() => setCartOpen(!cartOpen)}
            className={styles.close}
            src={"/closeIcon.svg"}
            width={18}
            height={20}
            alt="close icon"
          />
        </div>
        {cart?.itemQuantity > 0 ? (
          <>
            <div
              // ref={scrollArea}
              className={styles.cartGridWrapper}
            >
              <div className={styles.cartGrid}>
                {cart.items.map((item) => (
                  <div className={styles.cartLine} key={item.id}>
                    <div className={styles.itemLeft}>
                      <div className={`${styles.imageWrapper} border`}>
                        <Image
                          src={item.product.images[0].file.url}
                          width={item.product.images[0].file.width}
                          height={item.product.images[0].file.height}
                          alt=""
                        />
                      </div>
                      <div className={styles.titleAndQuantityWrapper}>
                        <span>{item.product.name}</span>
                        <Quantity item={item} className={styles.quantityMobile} />
                      </div>
                    </div>
                    <div className={styles.itemRight}>
                      <Quantity item={item} className={styles.quantityDesktop} />
                      <span className={styles.lineTotal}>{item.price * item.quantity} eur</span>
                      <Image
                        src={"/trashIcon.svg"}
                        width={20}
                        height={27}
                        alt="remove article"
                        className={styles.removeButton}
                        onClick={() => removeCartItem(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {cart?.itemQuantity > 2 && <div className={styles.fade}></div>}
              {/* <div className={`${styles.arrowDown} ${hiddenArrow ? styles.hidden : undefined}`}>Arrow Down</div> */}
            </div>
            <div className={styles.gridFooter}>
              <div className={styles.subtotal}>
                <span>Subtotal: </span>
                <span>{cart.subTotal} eur</span>
                <span className={styles.emptySpan}></span>
              </div>
            </div>
            <div className={styles.buttons}>
              <div className={styles.continueShopping}>
                <Button secondary={true} onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
              <Button>
                <Link href={cart.checkoutUrl}>Checkout</Link>
              </Button>
            </div>
          </>
        ) : (
          <p className={styles.emptyCart}>The cart is empty!</p>
        )}
      </div>
      <div
        className={`${styles.cartBg} ${cartOpen ? undefined : styles.cartBgHidden}`}
        onClick={() => setCartOpen(false)}
      ></div>
    </>
  );
};

const Quantity = ({ item, className }) => {
  const { incrementCartItem, decrementCartItem } = useContext(CartContext);

  return (
    <span className={`${styles.quantity} ${className}`}>
      <Image
        src={"/decrementIcon.svg"}
        width={15}
        height={15}
        alt="decrease quantity"
        onClick={() => decrementCartItem(item.quantity, item.id)}
        className={`${styles.quantityUpdater} ${styles.decrease}`}
      />
      <span className={styles.quantityNumber}>{item.quantity}</span>
      <Image
        src={"/incrementIcon.svg"}
        width={15}
        height={15}
        alt="increase quantity"
        onClick={() => incrementCartItem(item.quantity, item.id)}
        className={`${styles.quantityUpdater} ${styles.increase}`}
      />
    </span>
  );
};

export default Cart;
