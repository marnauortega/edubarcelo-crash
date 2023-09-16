import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>&copy; {new Date().getFullYear()} All works Edu Barcelo - studio@edubarcelo.com</p>
    </footer>
  );
};

export default Footer;
