import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import InfoBox from "./Components/InfoBox";
import TableComponent from "./Components/TableComponent";
function App() {
  // array for the countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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
        setTableData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => {
        // console.log(response.data);
        setCountryInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        // console.log(data);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
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
                Worldwide
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
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            color="primary"
          ></InfoBox>
          <InfoBox
            title="Recovered Cases"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            color="secondary"
          ></InfoBox>
          <InfoBox
            title="Total Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            color="error"
          ></InfoBox>
          {/* INFOBOX1 title="coronavirus_cases" */}
          {/* INFOBOX2 title="recovered_cases" */}
          {/* INFOBOX3 title="deaths" */}

          {/* MAP */}
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          {/* TABLE */}
          <Typography variant="h5" className="app_right__countryHeading">
            Live Cases By Country
          </Typography>
          <TableComponent countries={tableData}></TableComponent>
          {/* GRAPH */}
          <Typography variant="h5" className="app_right__chartHeading">
            Worldwide New Cases
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
