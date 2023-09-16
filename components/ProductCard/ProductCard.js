import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

import styles from "./ProductCard.module.css";

const ProductCard = ({ product, isProduct, isPriority, ...delegated }) => {
  if (isProduct) {
    delegated.onClick = null;
  }

  return (
    <div className={styles.productCard}>
      <Link href={`/shop/${product.slug}`}>
        <div className={`border ${styles.images}`} {...delegated}>
          <Image
            className={styles.productFirstImage}
            src={product.images[0].file.url}
            width={product.images[0].file.width}
            height={product.images[0].file.height}
            alt=""
            priority={isPriority}
          />
        </div>
      </Link>
      {isProduct && (
        <div className={styles.infoWrapper}>
          <Link href={`/shop/${product.slug}`}>
            <p className={styles.productTitle}>{product.name}</p>
            <p className={styles.itemPrice}>
              {product.price} {product.currency.toLowerCase()}
            </p>
          </Link>
          <div className={styles.addToCartWrapper}>
            <AddToCartButton small={true} productId={product.id}>
              <span className={styles.longAddToCart}>Add to cart</span>
              <span className={styles.shortAddToCart}>Add</span>
            </AddToCartButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
