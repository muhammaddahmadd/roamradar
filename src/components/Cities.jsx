import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./Cities.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
const Cities = () => {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Please start adding cities to your list"} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

// Remove PropTypes, not needed for context-based component

export default Cities;
