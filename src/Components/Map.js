import React from "react";
import { Circle, Popup, MapContainer, TileLayer } from "react-leaflet";
import ChangeView from "./ChangeView";
import "./Map.css";
// import { showDataOnMap } from "./utils";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    color: "red",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 80,
  },
  recovered: {
    hex: "#7dd71d",
    color: "green",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 120,
  },
  deaths: {
    hex: "#fb4443",
    color: "blue",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 200,
  },
};

function Map({ countries, center, zoom, casesType = "cases" }) {
  console.log(casesTypeColors[casesType].hex);
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {/* {showDataOnMap(countries, casesType)} */}
        {countries.map((country) => {
          return (
            <Circle
              key={country.country}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              fillColor={casesTypeColors[casesType]["color"]}
              color={casesTypeColors[casesType]["color"]}
              opacity={0.4}
              radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
              }
            >
              <Popup>
                <div className="info__container">
                  <div
                    className="info__flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="info__country">{country.country}</div>
                  <div className="info__confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="info__recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="info__deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
