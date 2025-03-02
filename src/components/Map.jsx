import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css'
function Map() {
    const [searchParams, setSearchParams] = useSearchParams()
    console.log(searchParams)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    const navigate = useNavigate()

    const handlePositionChange = () => {
        setSearchParams({
            lat: 20,
            lng: 12,
        })
       
    }

    const handleNavigation = () => {
 navigate("form");
    }

    return (
      <div className={styles.mapContainer} onClick={handleNavigation}>
        {searchParams.size >0 ? <p>
          Position: lat:{lat} and lng:{lng}
        </p> : ""}
        <button onClick={handlePositionChange}>Change Position</button>
      </div>
    );
}


export default Map