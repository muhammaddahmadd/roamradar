import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage"
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Cities from "./components/Cities";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form"


const BASE_URl = "http://localhost:9000";
// const API_URL = "https://fake-api-yyfi.onrender.com";
function App() {
const [cities, setCities] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState("")
console.log(error)
console.log(cities)

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



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<Cities isLoading={isLoading} cities={cities} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={<CountryList isLoading={isLoading} cities={cities} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
