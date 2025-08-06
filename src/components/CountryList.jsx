import styles from './CountryList.module.css'
import Message from './Message';
import CountryItem from "./CountryItem"
import Spinner from './Spinner';
import { useCities } from '../contexts/CitiesContext';
function CountryList() {
const { isLoading, cities } = useCities();
    const uniqueCountries = Array.from(
      new Map(cities.map(city => [city.country, city])).values()
    );

    if (isLoading) return <Spinner/>
    if(!cities.length) return <Message message="Please start adding countries"/>
    
    return (
      <ul className={styles.countryList}>
        {uniqueCountries.map((country) => {
          return (
            <CountryItem
              key={country.id}
              name={country.country}
              emoji={country.emoji}
            />
          );
        })}
      </ul>
    );
}

export default CountryList