import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const formatNumbers = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : +0;

export const formatNumbersV2 = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : 0;

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const showDataOnMap = (countries, casesType = "cases") => {
  console.log("inside Map Utils");
  countries.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillColor={casesTypeColors[casesType].hex}
        color={casesTypeColors[casesType].hex}
        opacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <h1> I am a Popup</h1>
        </Popup>
      </Circle>
    );
  });
};
