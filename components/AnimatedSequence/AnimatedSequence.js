"use client";

import { useRef, useLayoutEffect, useState, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { MenuContext } from "@/Providers/MenuProvider";

import styles from "./AnimatedSequence.module.css";

const AnimatedSequence = ({ projectImages }) => {
  const router = useRouter();
  const canvasRef = useRef(null);
  const animation = useRef(null);
  const [crackComplete, setCrackComplete] = useState(false);
  const { setHeaderAndMenuHidden } = useContext(MenuContext);

  useLayoutEffect(() => {
    setHeaderAndMenuHidden(true);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 3024;
    canvas.height = 1983;
    const frameCount = 18;
    const currentFrame = (index) => `imageSequence/frame_${index.toString().padStart(2, "0")}.jpg`;
    const images = [];
    const crack = {
      frame: 0,
    };
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[crack.frame], 0, 0);
    }
    images[0].onload = render;
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wrapper",
          scrub: true,
          pin: true,
          // markers: true,
          start: "top top",
          end: "+=200%",
          onLeave: () => {
            router.push("/projects");
          },
        },
      });

      tl.to(
        crack,
        {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          duration: 9,
          onUpdate: render,
          onComplete: () => setHeaderAndMenuHidden(false),
          // use animation onUpdate instead of scrollTrigger's onUpdate
        },
        "crack"
      );

      tl.to(canvas, { opacity: 0, duration: 1, onReverseComplete: () => setHeaderAndMenuHidden(true) }, ">");

      projectImages.forEach((image, i) => {
        tl.fromTo(
          `.image-${i}`,
          { autoAlpha: 0, scale: 0.3 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 9,
          },
          ">"
        );
        tl.to(`.image-${i}`, { autoAlpha: 0, duration: 1 }, ">");
      });

      tl.to(".scrollDown", { autoAlpha: 0, duration: 1 }, "crack+=1");
    }, animation);
    return () => ctx.revert(); // cleanup
  }, [canvasRef]);

  return (
    <div ref={animation}>
      <div className={`wrapper ${styles.wrapper}`}>
        <div>
          <NextImage
            className={`scrollDown ${styles.scrollDown}`}
            src="/scrollDown.svg"
            width={108}
            height={99}
            alt=""
          />
          <canvas
            ref={canvasRef}
            className={`canvas ${styles.canvas} ${crackComplete ? styles.hiddenCanvas : undefined}`}
          />
        </div>

        {projectImages.map((image, i) => (
          <NextImage
            key={image.file.url}
            className={`${styles.image} image-${i}`}
            src={image.file.url}
            width={image.file.width}
            height={image.file.height}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedSequence;
