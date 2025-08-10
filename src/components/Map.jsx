import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import Button from "./Button";
import useUrlLocation from "../hooks/useUrlLocation";
import PropTypes from "prop-types";

ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
function Map() {
  const [lat, lng] = useUrlLocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { isLoading, position: geoLocation, getPosition } = useGeolocation();
  const { cities } = useCities();
  // console.log(cities)

  useEffect(() => {
    if (geoLocation) {
      setMapPosition([geoLocation.lat, geoLocation.lng]);
    } 
  }, [geoLocation]);

useEffect(() => {
  if (lat && lng) {
    setMapPosition([lat, lng]); //  Correct, passing as an array
  }
}, [lat, lng]);


  
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading.." : "Use Your Position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities
          .filter(
            (city) =>
              
              city.position?.lat !== undefined &&
              city.position?.lng !== undefined
          ) // Ensure lat/lng exist
          .map((city) => (
            
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>{city.cityName }</Popup>
            </Marker>
          ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  if (position && position[0] !== undefined && position[1] !== undefined) {
    map.setView(position);
  }
  return null;
}


function DetectClick() {
  // console.log("clicking...")
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)});
  return null;
}

export default Map;
