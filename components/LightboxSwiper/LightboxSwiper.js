"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import styles from "./LightboxSwiper.module.css";

const LightboxSwiper = ({ projects, selectedProject, setLightboxOpen }) => {
  const navigateToSlide = (swiper) => {
    const slide = swiper.slides.find((slide) => slide.id === selectedProject);
    const index = slide.getAttribute("data-swiper-slide-index");
    swiper.slideTo(index);
  };

  return (
    <>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop="true"
        speed={0}
        onSwiper={navigateToSlide}
        className={styles.wrapper}
      >
        {projects.map((project, i) => {
          if (!project.images[0]) return;

          return project.images.map((image, index, array) => (
            <SwiperSlide id={project.id} key={`slide-${i}-${index}`}>
              <Image
                className={`border ${styles.slide}`}
                src={image.file.url}
                alt=""
                width={image.file.width}
                height={image.file.height}
              />
              <h3 className={`h2 ${styles.title}`}>
                {project.name} {array.length > 1 ? `( ${index + 1} / ${array.length} )` : undefined}
              </h3>
            </SwiperSlide>
          ));
        })}
        <SwiperNavigation />
      </Swiper>
      <h2 className={styles.logo}>
        <Link href="/">Edu Barceló</Link>
      </h2>
      <Image
        onClick={() => setLightboxOpen(false)}
        className={styles.close}
        src={"/closeIcon.svg"}
        width={23}
        height={25}
        alt="close icon"
      />
    </>
  );
};

const SwiperNavigation = () => {
  const swiper = useSwiper();
  return (
    <>
      <button onClick={() => swiper.slidePrev()}>
        <Image className={`${styles.navArrow} ${styles.navPrev}`} src={"/navArrow.svg"} width={58} height={47} alt="" />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <Image className={`${styles.navArrow} ${styles.navNext}`} src={"/navArrow.svg"} width={58} height={47} alt="" />
      </button>
    </>
  );
};

export default LightboxSwiper;
