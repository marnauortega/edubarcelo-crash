"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useContext } from "react";
import { MenuContext } from "@/Providers/MenuProvider";

import styles from "./CloseInfo.module.css";

const CloseInfo = () => {
  const router = useRouter();
  const { setInfoOpen } = useContext(MenuContext);

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.close}
        src={"/closeIcon.svg"}
        width={18}
        height={20}
        alt="close icon"
        onClick={() => {
          setInfoOpen(false);
          if (router.back()) {
            router.back();
          } else {
            router.push("/shop");
          }
        }}
      />
      <Image className={styles.closeBg} src={"/closeBg.svg"} width="35" height="35" alt="" />
    </div>
  );
};

export default CloseInfo;
