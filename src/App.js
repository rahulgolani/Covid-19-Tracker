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
import { sortData, formatNumbers, formatNumbersV2 } from "./Components/utils";
import LineGraph from "./Components/LineGraph";
import Map from "./Components/Map";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

function App() {
  // array for the countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [center, setCenter] = useState([18.5204, 73.8567]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //GETTING COUNTRIES FROM THE API
  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        const countriesArr = response.data.map((countryData) => ({
          name: countryData.country,
          value: countryData.countryInfo.iso2 || countryData.country,
        }));
        // console.log(countriesArr);
        // setting the countries data to be displayed on map
        setMapCountries(response.data);

        setCountries(countriesArr);
        const sortedData = sortData(response.data);
        setTableData(sortedData);
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
        // console.log(data.countryInfo.lat);
        // console.log(data.countryInfo.long);
        setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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
            onClick={() => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={formatNumbers(countryInfo.todayCases)}
            total={formatNumbersV2(countryInfo.cases)}
            color="primary"
          ></InfoBox>
          <InfoBox
            onClick={() => setCasesType("recovered")}
            title="Recovered Cases"
            cases={formatNumbers(countryInfo.todayRecovered)}
            total={formatNumbersV2(countryInfo.recovered)}
            color="secondary"
          ></InfoBox>
          <InfoBox
            onClick={() => setCasesType("deaths")}
            title="Total Deaths"
            cases={formatNumbers(countryInfo.todayDeaths)}
            total={formatNumbersV2(countryInfo.deaths)}
            color="error"
          ></InfoBox>
          {/* INFOBOX1 title="coronavirus_cases" */}
          {/* INFOBOX2 title="recovered_cases" */}
          {/* INFOBOX3 title="deaths" */}

          {/* MAP */}
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={center}
          zoom={mapZoom}
        ></Map>
      </div>
      <Card className="app_right">
        <CardContent className="app_right__cardcontent">
          {/* TABLE */}
          <Typography variant="h5" className="app_right__countryHeading">
            Live Cases By Country
          </Typography>
          <TableComponent countries={tableData}></TableComponent>
          {/* GRAPH */}
          <Typography variant="h5" className="app_right__chartHeading">
            Worldwide New Cases
          </Typography>
          <LineGraph></LineGraph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
