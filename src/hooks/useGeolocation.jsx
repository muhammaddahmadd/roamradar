import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(defaultPosition);
console.log(error);
  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    setIsLoading(true);// hook to get current position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, position, getPosition };
}
