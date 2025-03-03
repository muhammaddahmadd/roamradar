import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const CitiesContext = createContext();

// const BASE_URl = "http://localhost:9000";
const API_URL = "https://fake-api-yyfi.onrender.com";

function CitiesProvider({children}){
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})
    // const [error, setError] = useState("")
  
    // console.log(error)
     useEffect(()=> {
      async  function getCities() {
        setIsLoading(true)
        // setError("")
        try {
          const res = await fetch(`${API_URL}/cities`);
          
          if(!res.ok) {
           throw new Error ("Error occured fetching data")
          } else {
            const data = await res.json();
            console.log(data)
            setCities(data)
          }
        }
        catch(err) {
          console.log(err.message)
          // setError(err.message)
        } finally {
          setIsLoading(false)
          // setError("")
        }
      } 
      
      getCities()
     },[])
    
     async function getCurrentCity(id) {
      try {
       const res = await fetch(`${API_URL}/cities/${id}`);
       if (res.ok) {
        const data =await res.json()
        console.log(data)
        setCurrentCity(data)
       } else {
        throw new Error ("Error happened fetching data")
       }
      } catch(err) {
        console.log(err.message)
      }
     }


    return (
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          currentCity,
          getCurrentCity,
        }}
      >
        {children}
      </CitiesContext.Provider>
    );
}


function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("Context being used somewhere not supposed to be")
    return context;
}

export { useCities, CitiesProvider}