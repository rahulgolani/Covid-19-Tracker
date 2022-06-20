import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import ChangeView from "./ChangeView";
import "./Map.css";
function Map({ center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
      </MapContainer>
    </div>
  );
}

export default Map;
