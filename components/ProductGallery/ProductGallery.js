"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import styles from "./ProductGallery.module.css";

const ProductGallery = ({ images }) => {
  return (
    <>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop="true"
        speed={0}
        className={styles.swiper}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`slide-${i}`} className={styles.slide}>
              <Image
                // onClick={() => swiper.slideNext()}
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
        <Thumbs images={images} />
      </Swiper>
    </>
  );
};

const Thumbs = ({ images }) => {
  const swiper = useSwiper();

  return (
    <div className={styles.thumbs}>
      {images.map((image, i) => {
        return (
          <Image
            key={`slide-${i}`}
            id={`slide-${i}`}
            onClick={() => swiper.slideTo(i)}
            className={`border ${styles.thumb}`}
            src={image.url}
            alt=""
            width={image.width}
            height={image.height}
          />
        );
      })}
    </div>
  );
};

export default ProductGallery;
