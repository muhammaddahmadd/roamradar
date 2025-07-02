import { createContext, useContext, useReducer, useEffect } from "react";

const CitiesContext = createContext();

// API URL
const API_URL = "https://fake-api-yyfi.onrender.com";

// Initial State
const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  error: "",
};

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };

    case "CITIES_LOADED":
      return { ...state, cities: action.payload, isLoading: false };

    case "CURRENT_CITY_LOADED":
      return { ...state, currentCity: action.payload, isLoading: false };

    case "CITY_CREATED":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload
      };

    case "CITY_DELETED":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}

// Context Provider
function CitiesProvider({ children }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetch Cities on Mount 
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(`${API_URL}/cities`);
        if (!res.ok) throw new Error("Error fetching cities");
        const data = await res.json();
        dispatch({ type: "CITIES_LOADED", payload: data });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }
    fetchCities();
  }, []);

  // Get Single City
  async function getCurrentCity(id) {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${API_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Error fetching city data");
      const data = await res.json();
      dispatch({ type: "CURRENT_CITY_LOADED", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  // Create City
  async function createCity(newCity) {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      if (!res.ok) throw new Error("Error creating city");
      const data = await res.json();
      dispatch({ type: "CITY_CREATED", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }
  // Delete City
  async function deleteCity(id) {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${API_URL}/cities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting city");
      dispatch({ type: "CITY_DELETED", payload: id });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { useCities, CitiesProvider };
