"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "@/Providers/MenuProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

import styles from "./MainMenu.module.css";

const MainMenu = ({ hiddenInHome }) => {
  const { menuOpen, setMenuOpen, infoOpen, setInfoOpen } = useContext(MenuContext);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/info") {
      setMenuOpen(false);
      setInfoOpen(false);
    }
    setLastPath(pathname);
    if (lastPath === "/" && pathname === "/projects") {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        document.querySelector("main"),
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 0.85, delay: 0.25, clearProps: "all" }
      );
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1100);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/info") {
      setInfoOpen(true);
      setMenuOpen(true);
    }
  }, []);

  return (
    <>
      <div
        className={`
        ${styles.menu} 
        ${infoOpen ? styles.menuInInfo : undefined} 
        ${pathname.includes("/shop/") || hiddenInHome ? styles.menuHidden : undefined}
        ${menuOpen ? undefined : styles.mobileMenuHidden}
        `}
      >
        <Link href="/">
          <h1 className={`h2 ${styles.title}`}>Edu Barceló</h1>
        </Link>
        <nav className={`h2 ${styles.nav} mobileBigFont`}>
          <ul>
            <li>
              <Link href="/projects" className={pathname === "/projects" ? styles.active : undefined}>
                Projects
              </Link>
            </li>
            <span className={styles.comma}>, </span>
            <li>
              <Link href="/shop" className={pathname === "/shop" ? styles.active : undefined}>
                Shop
              </Link>
            </li>
            <br />
            <li
              onClick={() => {
                setInfoOpen(true);
                setTimeout(() => router.push("/info"), 500);
              }}
            >
              <p className={`h2 pointer mobileBigFont ${pathname === "/info" ? styles.active : undefined}`}>Info</p>
            </li>
            <span className={styles.comma}>, </span>
            <li>
              <Link target="blank" href="https://www.instagram.com/edubarcelox/">
                IG
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <svg
        className={`
        ${styles.menuImage} 
        ${styles.menuBg} 
        ${infoOpen ? styles.menuBgBig : undefined}
        ${pathname.includes("/shop/") || hiddenInHome ? styles.menuHidden : undefined}
        ${menuOpen ? undefined : styles.mobileMenuHidden}
        `}
        preserveAspectRatio="none"
        width="353"
        height="180"
        viewBox="0 0 353 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M347.728 26.7696C348.488 25.4808 349.393 24.2342 350.435 23.0407C350.717 22.7139 352.598 19.9373 353.01 19.9255C345.421 20.1606 337.999 21.1387 330.578 22.3048C324.549 23.2453 318.572 24.4678 312.578 25.5823C307.589 26.5086 302.605 27.449 297.625 28.4036C296.979 28.5258 296.391 28.7351 295.906 28.0697C295.125 27.4843 294.647 26.4075 294.049 25.7186C293.361 24.9098 292.618 24.1199 291.872 23.3346C291.528 22.9749 287.25 18.3315 287.033 18.3973C281.562 19.8573 275.657 20.083 270.027 21.1998C264.301 22.3354 258.61 23.5509 252.956 24.8534C246.831 26.2523 240.765 28.1238 234.516 29.2077C235.046 29.116 235.548 23.3299 235.678 22.6693C236.074 20.4475 236.463 18.2233 236.824 15.9968C237.185 13.7704 237.511 11.5862 237.818 9.3785C238.086 7.37537 238.705 5.18414 238.581 3.18806C234.138 4.10264 230.327 5.66847 226.17 7.07207C222.012 8.47568 217.785 9.73352 213.638 11.17C206.072 13.7915 198.689 16.8762 190.968 19.1638C190.053 19.4318 189.193 19.8691 188.303 20.2006C186.047 21.0611 183.805 21.9498 181.524 22.7492C180.414 23.1371 179.365 23.0666 178.254 22.3848C175.534 20.7178 172.679 19.2249 169.908 17.6214C165.344 14.9553 160.839 12.2257 156.237 9.63947C151.423 6.96863 146.701 4.23195 141.917 1.57521C141.653 1.40769 141.34 1.27959 140.999 1.19903C140.311 1.06972 139.589 1.35185 139.053 1.68101C133.922 4.81972 128.048 7.32364 123.343 10.8127C122.497 11.4357 121.479 11.8636 120.592 12.4584C119.87 12.9428 119.186 12.9498 118.422 12.6207C118.078 12.4678 117.71 12.3456 117.356 12.2045C112.239 10.1669 107.118 8.12928 101.994 6.09167C99.3896 5.05718 96.7874 4.01957 94.1875 2.97881C92.0485 2.11596 90.1226 0.919253 87.8357 0.211573C86.436 -0.22338 85.4284 0.054049 84.1697 0.660632C79.3929 2.94825 74.4029 4.85734 69.9322 7.68336C66.8371 9.64653 63.4497 11.2688 60.2583 13.1285C59.7759 13.4438 59.1587 13.6456 58.4968 13.7044C57.8349 13.7632 57.1628 13.6759 56.5786 13.4553C52.1079 11.9906 47.6372 10.4483 43.1664 8.9459C40.9517 8.2006 38.737 7.30013 36.4157 6.70765C35.7279 6.53367 30.5694 5.86361 30.5694 5.32756C30.6141 8.06189 31.8487 10.8268 32.5846 13.507C33.4122 16.3349 34.0195 19.1908 34.4039 22.0627C34.9878 27.324 35.96 32.5619 37.3167 37.7562C37.5849 38.7578 37.7087 39.7899 37.8807 40.728C37.7428 40.841 37.5896 40.9449 37.4233 41.0384C30.7551 43.3895 24.104 45.7758 17.6112 48.529C14.4886 49.8526 11.3969 51.2116 8.41187 52.681C5.55062 54.0917 3.00575 55.7657 -0.0102539 56.9953C1.21747 58.949 2.44863 60.8675 3.65229 62.8283C5.40274 65.6826 6.88495 68.6802 8.7764 71.4498C12.5765 77.0078 16.2184 82.6528 20.4312 87.978C22.6734 90.8135 24.6061 93.8558 26.6214 96.6983C23.7705 101.788 21.0846 106.705 18.2749 111.562C15.7645 115.904 13.0924 120.172 10.5441 124.493C7.64841 129.407 6.17652 134.92 2.24573 139.505C1.79178 140.022 6.40005 144.148 7.06034 144.752C8.95523 146.539 10.7676 148.366 12.7588 150.108C14.1344 151.319 15.7163 152.36 17.2295 153.454C20.046 155.492 22.8832 157.502 25.6997 159.543C26.3875 160.049 27.0341 160.625 27.6806 161.151C27.3986 161.746 27.1888 162.169 26.9928 162.602C25.1701 166.754 23.6295 171.026 21.4319 175.081C34.5002 173.85 47.5374 172.293 60.6366 170.979C69.3029 170.109 77.9795 169.279 86.6664 168.489C91.0087 168.097 95.3533 167.713 99.7002 167.337C103.332 167.024 107.111 166.827 110.705 166.298C111.049 166.246 118.924 176.596 120.138 177.583C119.977 177.451 125.885 176.116 126.452 175.961C130.373 174.893 133.836 173.918 137.502 172.462L148.909 167.934L172.133 158.723C172.084 158.741 181.576 170.057 182.398 171.005C183.106 170.271 185.06 169.817 186.126 169.27C188.354 168.125 190.487 166.876 192.66 165.684C192.66 165.684 200.411 171.092 200.938 171.454C204.122 173.614 207.317 175.733 210.288 178.037C211.905 176.452 214.57 175.556 216.685 174.32C218.986 172.933 221.177 171.462 223.246 169.914C223.945 169.418 224.679 168.947 225.447 168.503C228.518 166.69 231.662 164.976 234.657 163.07C238.547 160.592 242.309 157.944 246.157 155.408C247.877 154.279 249.661 153.263 251.395 152.163C251.517 152.067 251.666 151.989 251.833 151.934C252.001 151.878 252.183 151.846 252.369 151.841C252.555 151.835 252.74 151.855 252.914 151.899C253.089 151.944 253.248 152.012 253.382 152.1C254.445 152.645 255.491 153.219 256.536 153.795C263.968 157.9 271.393 162.023 278.859 166.091C285.895 169.93 293.385 173.283 300.703 176.906C302.835 177.964 305.033 178.911 307.402 180.005C307.619 179.708 307.784 179.462 307.973 179.229C309.397 177.51 310.742 175.73 312.265 174.087C315.744 170.367 318.831 166.481 321.502 162.461C323.528 159.404 325.492 156.31 327.462 153.228C327.717 152.824 331.726 145.705 332.772 146.358C330.736 145.107 329.677 143.041 328.184 141.482C326.248 139.455 324.26 137.471 322.338 135.423C318.607 131.426 315.845 126.724 311.333 123.277C310.611 122.727 310.449 122.076 310.869 121.246C311.691 119.6 312.358 117.896 313.221 116.271C315.009 112.911 316.891 109.594 318.724 106.253C318.724 105.59 319.649 104.572 319.996 103.947C320.427 103.18 320.859 102.415 321.293 101.652C322.161 100.13 323.053 98.6144 323.968 97.105C325.66 94.3166 327.751 91.768 329.543 89.0337C329.804 88.6363 330.492 87.9733 330.519 87.5431C330.547 87.1128 330.124 86.8119 329.811 86.4428C328.367 84.7547 327.153 82.982 325.591 81.3409C322.947 78.5572 320.213 75.8393 317.489 73.112C316.915 72.5407 316.822 72.0305 317.324 71.4051C317.623 71.0266 317.867 70.6105 318.149 70.2296C320.295 67.2508 322.476 64.2907 324.584 61.2954C326.991 57.8534 329.323 54.362 331.73 50.9177C334.519 46.9208 337.459 43.0227 340.145 38.9788C342.821 34.9725 345.324 30.891 347.728 26.7696Z"
          fill="black"
        />
      </svg>
      <Image
        className={`${styles.infoBg} ${infoOpen ? styles.infoBgVisible : undefined}`}
        src={"/infoBg.png"}
        width={1383}
        height={978}
        alt=""
      />
    </>
  );
};

export default MainMenu;