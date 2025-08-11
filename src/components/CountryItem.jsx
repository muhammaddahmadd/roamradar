import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ country, emoji }) {
  return (
    <li>
      <p className={styles.countryItem} to={`${country}`}>
        <span>{emoji}</span>
        <span>{country}</span>
      </p>
    </li>
  );
}

CountryItem.propTypes = {
  country: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default CountryItem;