// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlLocation from "../hooks/useUrlLocation";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [mapLat, mapLng] = useUrlLocation();

  const [formLoading, setFormLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [formError, setFormError] = useState("")
  const [emoji, setEmoji] = useState("")


  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate()

  function handleStepBack (e) {
    e.preventDefault()
    navigate(-1)
  }



  useEffect(()=> {
    async function getCityData() {
     try {
      setFormLoading(true)
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();
       setCityName(data.city)
       setCountry;(data.countryName)
       setEmoji(convertToEmoji(data.countryCode));
      }catch(err) {
        setFormError(err.message)
      } finally {
       setFormLoading(false);
      }
    }
    getCityData()
  }, [mapLat, mapLng])



  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type ="primary" >Add</Button>
        {/* <Button type ="back" onClick={handleStepBack}>&larr; Back</Button> */}
        <BackButton/>
       
      </div>
    </form>
  );
}

export default Form;
