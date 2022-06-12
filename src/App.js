import "./App.css";
import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import InfoBox from "./Components/InfoBox";
function App() {
  //GETTING COUNTRIES FROM THE API
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        const countriesArr = response.data.map((countryData) => ({
          name: countryData.country,
          value: countryData.countryInfo.iso3 || countryData.country,
        }));
        // console.log(countriesArr);
        setCountries(countriesArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // array for the countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  const onCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        {/* BEM Naming Convention */}
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
            color="primary"
            size="small"
          >
            <MenuItem key="worldwide" value="worldwide">
              WorldWide
            </MenuItem>
            {/* Loop through all the countries */}
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* HEADER */}
      {/* TITLE + SELECT DROPDOWN */}

      <div className="app__stats">
        <InfoBox
          title="Coronavirus Cases"
          cases={12345}
          total={100000}
        ></InfoBox>
        <InfoBox title="Recovered Cases" cases={1234} total={10000}></InfoBox>
        <InfoBox title="Deaths" cases={123} total={100}></InfoBox>
        {/* INFOBOX1 title="coronavirus_cases" */}
        {/* INFOBOX2 title="recovered_cases" */}
        {/* INFOBOX3 title="deaths" */}
      </div>

      {/* TABLE */}
      {/* GRAPH */}
      {/* MAP */}
    </div>
  );
}

export default App;
