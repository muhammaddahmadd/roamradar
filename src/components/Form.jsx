import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlLocation from "../hooks/useUrlLocation";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = import.meta.env.VITE_GEOCODING_API_URL;

function Form() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const { createCity } = useCities();

  // console.log(createCity, "create city")
  
  const [formLoading, setFormLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [formError, setFormError] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setFormError("")
    if (!lat && !lng) return;
    async function getCityData() {
      try {
        setFormLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if(data.city === "" || data.countryName === ""){
          setFormError("Please click on the map to get the city")
        }
        // console.log(data)
        setCityName(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setFormError(err.message);
      } finally {
        setFormLoading(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  if (formLoading) return <Spinner />;
  if (!lat && !lng) return <Message message="Please add city correctly!!!" />;
  if (formError) return <Message message={formError} />;

  async function handleAddSubmission(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log(newCity, "checking what is the new city here..")
    await createCity(newCity);

    navigate("/app/cities");
    setCityName("");
    setDate("");
    setNotes("");
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleAddSubmission(e)}>
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
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
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
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;