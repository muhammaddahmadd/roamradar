// import { createContext, useContext } from "react";
// import { useState, useEffect } from "react";

// const CitiesContext = createContext();

// const API_URL = "https://fake-api-yyfi.onrender.com";

// function CitiesProvider({ children }) {
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentCity, setCurrentCity] = useState({});

//   useEffect(() => {
//     async function getCities() {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`${API_URL}/cities`);

//         if (!res.ok) {
//           throw new Error("Error occured fetching data");
//         } else {
//           const data = await res.json();
//           setCities(data);
//         }
//       } catch (err) {
//         console.log(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     getCities();
//   }, []);

//   async function getCurrentCity(id) {
//     try {
//       const res = await fetch(`${API_URL}/cities/${id}`);
//       if (res.ok) {
//         const data = await res.json();

//         setCurrentCity(data);
//       } else {
//         throw new Error("Error happened fetching data");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   async function createCity(newCity) {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/cities`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newCity),
//       });

//       if (!res.ok) throw new Error("Error creating city");

//       const data = await res.json();
//       setCities((prevCities) => [...prevCities, data]);
//     } catch (err) {
//       console.error("Error:", err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function deleteCity(id) {
//     setIsLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/cities/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete city");
//       }

//       setCities((cities) => cities.filter((city) => city.id !== id));
//     } catch (err) {
//       console.error("Error deleting city:", err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <CitiesContext.Provider
//       value={{
//         cities,
//         isLoading,
//         currentCity,
//         getCurrentCity,
//         createCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </CitiesContext.Provider>
//   );
// }

// function useCities() {
//   const context = useContext(CitiesContext);
//   if (context === undefined)
//     throw new Error("Context being used somewhere not supposed to be");
//   return context;
// }

// export { useCities, CitiesProvider };
