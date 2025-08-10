import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.main}>
      <img src={"public/imgs/logo.png"} alt=" logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
