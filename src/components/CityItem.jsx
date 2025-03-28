import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes, { func } from "prop-types";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();



  async function handleDelete(id) {
    if (!id) {
      console.error("Invalid city ID");
      return;
    }
    console.log("Deleting city with ID:", id);
    await deleteCity(id);
  }

  const {
    cityName,
    emoji,
    date,
    id,
    position: {lat, lng},
  } = city;


  return (
    <li>
      <Link
        className={
          styles.cityItem +
          " " +
          `${currentCity.id === id ? styles["cityItem--active"] : ""}`
        }
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={async (e) => {
            e.preventDefault();
            await handleDelete(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  cityName: PropTypes.string,
  city: PropTypes.object,
};

export default CityItem;
