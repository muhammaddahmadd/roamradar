<<<<<<< HEAD
import styles from './Button.module.css'
function Button({type, onClick, children}) {
    
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
=======
import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ children, type, onClick }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
>>>>>>> 54308b7 (revamp and clean fixes)
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["primary", "back", "position"]).isRequired,
  onClick: PropTypes.func,
};

export default Button;