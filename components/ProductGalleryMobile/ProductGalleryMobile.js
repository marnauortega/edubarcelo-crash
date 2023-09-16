"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./ProductGalleryMobile.module.css";

const ProductGalleryMobile = ({ images }) => {
  return (
    <>
      <Swiper
        spaceBetween={18}
        slidesPerView={"auto"}
        // loop="true"
        className={styles.swiper}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`slide-${i}`} className={styles.slide}>
              <Image
                id={`slide-${i}`}
                className={`border ${styles.slideImage}`}
                src={image.url}
                alt=""
                width={image.width}
                height={image.height}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductGalleryMobile;
