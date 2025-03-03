import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import PropTypes from "prop-types";
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


  function handleDeletion(id){
    console.log(`deleting city with id: ${id}`)
  }
function CityItem({city}) {
  const {currentCity} = useCities()

    const {cityName, emoji, date, id, position: {lat, lng}} = city;
    return (
      <li>
        <Link className={styles.cityItem + " " +  `${currentCity.id === id? styles["cityItem--active"]: ""}`} to={`${id}?lat=${lat}&lng=${lng}`}>
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}> {cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button className={styles.deleteBtn} onClick={()=>handleDeletion(id)}>&times;</button>
        </Link>
      </li>
    );
}

CityItem.propTypes = {
  cityName: PropTypes.string,
  city: PropTypes.object,
};

export default CityItem