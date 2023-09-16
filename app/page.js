import { getHomeAnimationsCategory } from "@/lib/swell/queries/homeAnimationscategory";
import AnimatedSequence from "@/components/AnimatedSequence/AnimatedSequence";

import styles from "./page.module.css";

const Home = async () => {
  const homeImages = await getHomeAnimationsCategory();

  return (
    <div className={styles.home}>
      <AnimatedSequence projectImages={homeImages} />
    </div>
  );
};

export default Home;
