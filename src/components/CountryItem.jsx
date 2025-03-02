import styles from "./CountryItem.module.css";

function CountryItem({ emoji, country }) {

  
  
  // const unique_countries = new Set([country])
  // console.log(unique_countries)

  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
