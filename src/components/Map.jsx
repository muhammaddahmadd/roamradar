import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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
  const [userSearchInput, setUserSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  const { isLoading, position: geoLocation, getPosition } = useGeolocation();
  const { cities } = useCities();

  // Handle search input with debouncing
  const handleSearchInput = async (e) => {
    const value = e.target.value;
    setUserSearchInput(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!value.trim() || value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&featureType=city&addressdetails=1`
        );

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        const cityResults = data.filter(item =>
          item.type === 'city' ||
          item.type === 'town' ||
          item.type === 'village' ||
          item.class === 'place'
        );

        setSuggestions(cityResults);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching cities:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleCitySelect = (city) => {
    setUserSearchInput(city.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setMapPosition([parseFloat(city.lat), parseFloat(city.lon)]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setUserSearchInput("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (geoLocation) {
      setMapPosition([geoLocation.lat, geoLocation.lng]);
    }
  }, [geoLocation]);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <div ref={searchRef} className={styles.searchContainer}>
        <input
          type="text"
          value={userSearchInput}
          onChange={handleSearchInput}
          placeholder="Search for cities..."
          className={styles.searchInput}
        />
        {/* {isSearching && (
          <div className={styles.searchingIndicator}></div>
        )} */}
        
        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestionsContainer}>
            {suggestions.map((city, index) => (
              <div
                key={`${city.place_id}-${index}`}
                className={styles.suggestionItem}
                onClick={() => handleCitySelect(city)}
              >
                <div className={styles.suggestionName}>
                  {city.name || city.display_name.split(',')[0]}
                </div>
                <div className={styles.suggestionDetails}>
                  {city.display_name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
          )
          .map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>{city.cityName}</Popup>
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
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}

export default Map;
