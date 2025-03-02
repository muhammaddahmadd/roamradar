import PropTypes from "prop-types";
import Spinner from "./Spinner"
import CityItem from "./CityItem";
import styles from './Cities.module.css'
import Message from "./Message"
const Cities = ({ isLoading, cities }) => {

    if(isLoading) return  <Spinner />
    if (!cities.length) return <Message message={"Please start adding cities to your list"}/>

  return (
    <ul className={styles.cityList}>
       { cities.map((city) => <CityItem key={city.id} city={city} />)}
    </ul>
  );
};

// Define PropTypes
Cities.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
};

export default Cities;
