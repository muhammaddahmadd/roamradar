import { useContext } from "react";

const CitiesContext = useContext();

const BASE_URl = "http://localhost:9000";
// const API_URL = "https://fake-api-yyfi.onrender.com";

function CitiesProvider({children}){
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState("")
  
    
     useEffect(()=> {
      async  function getCities() {
        setIsLoading(true)
        setError("")
        try {
          const res = await fetch(`${BASE_URl}/cities`);
          
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
          setError(err.message)
        } finally {
          setIsLoading(false)
          setError("")
        }
      } 
      
      getCities()
     },[])
    
    return <CitiesContext.Provider value={{
        cities,
        isLoading
    }}>
        {children}
    </CitiesContext.Provider>
}


function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("Context being used somewhere not supposed to be")
    return context
}

export { useCities, CitiesProvider}