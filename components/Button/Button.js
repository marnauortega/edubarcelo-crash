import styles from "./Button.module.css";

const Button = ({ children, secondary = false, small = false, ...delegated }) => {
  return (
    <button
      className={`p 
      ${styles.button} 
      ${secondary ? styles.secondary : undefined} 
      ${small ? styles.smallButton : undefined}
      `}
      {...delegated}
    >
      {children}
    </button>
  );
};

export default Button;
