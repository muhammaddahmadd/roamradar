import styles from "./Message.module.css";
import PropTypes from "prop-types";

function Message({ message }) {
  return (
    <div className={styles.message}>
      <p>{message}</p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;