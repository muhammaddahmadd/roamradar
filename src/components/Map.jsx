import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Map.module.css";
import Button from "./Button";
import useUrlLocation from "../hooks/useUrlLocation";

function Map() {
  const [mapLat, mapLng] = useUrlLocation();
  // const urlPosition = [mapLat, mapLng];
  // console.log(urlPosition)
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { isLoading, position: geoLocation, getPosition } = useGeolocation();
  const { cities } = useCities();

  useEffect(() => {
    if (geoLocation) {
      setMapPosition([geoLocation.lat, geoLocation.lng]);
    } 
  }, [geoLocation]);

useEffect(() => {
  if (mapLat && mapLng) {
    setMapPosition([mapLat, mapLng]); // ✅ Correct, passing as an array
  }
}, [mapLat, mapLng]);


  
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

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{city.name || "A city location"}</Popup>
          </Marker>
        ))}

        <ChangeCenter
          position={mapLat && mapLng ? [mapLat, mapLng] : mapPosition}
        />

        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position);
  }
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)});
  return null;
}

export default Map;
