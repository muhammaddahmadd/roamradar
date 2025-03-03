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
  const navigate = useNavigate(); // ✅ Added navigate definition
  const [mapPosition, setMapPosition] = useState([40, 0]);


  const { isLoading, position: geoLocation, getPosition } = useGeolocation();
  const { cities } = useCities();

  // ✅ Improved effect to handle both geoLocation and searchParams
  useEffect(() => {
    if (geoLocation?.lat && geoLocation?.lng) {
      setMapPosition([geoLocation.lat, geoLocation.lng]);
    } else if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [geoLocation, mapLat, mapLng]);

  
function handleClickOpenForm(){
navigate("form")
}

  return (
    <div className={styles.mapContainer} onClick={handleClickOpenForm}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading.." : "Use Your Position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
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

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e.latlng)
     return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

    },
  });
  return null;
}

export default Map;
