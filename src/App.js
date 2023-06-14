// import React from 'react';
// import GeoChart from './GeoChart';

// const App = () => {
//   const chartData = [
//     {
//       id: "ARE",
//       value: 610382
//     },
//     // { id: 'CAN', value: 500 },
//     // { id: 'MEX', value: 200 },
//   ];

//   return (
//     <div className='container'>
//       <h1 className='text-center my-4 text-primary fw-bold text-uppercase'>Geo Chart Example</h1>
//       <GeoChart data={chartData} />

//     </div>
//   );
// };

// export default App;
import React, { useRef, useState } from "react";
import { Map, TileLayer, Polygon } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { Label } from "reactstrap";
import Select from "react-select";
import optionValue from "./world_countries.json";
import stateValue from "./stateIndian.json";
const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng = [28.3852, -81.5639];
const disneyLandLatLng = [33.8121, -117.919];

function App() {
  const [selectedCountry, setSelectedCountry] = useState();
  
  const [selectedCountryCod, setSelectedCountryCod] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedStateCod, setSelectedStateCod] = useState();

  const mapRef = useRef();
  /**
   * handleOnSetView
   */
  // country
  const countryOptions = optionValue.features?.map((country) => ({
    value: country?.geometry,
    label: country?.properties.name,
  }));

  // state
  const stateOptions = stateValue.features?.map((country) => ({
    value: country?.geometry,
    label: country?.properties.st_nm,
  }));

  console.log(stateOptions[0]);

  const handleCountrySelect = (selectedOption) => {
    setSelectedCountry({
      id: selectedOption.label,
      value: selectedOption.value,
    });
    setSelectedCountryCod(selectedOption.value.coordinates);
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.setView(
      selectedOption.value.coordinates[0][0].length > 2
        ? selectedOption.value.coordinates[0][0][0]
        : selectedOption.value.coordinates[0][0],
      14
    );
  };
  function handleOnSetView() {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.setView(disneyWorldLatLng, 14);
  }
  /**
   * handleOnFlyTo
   */

  const purpleOptions = { color: "purple" };
  const blackOptions = { color: 'black' };

  function handleOnFlyTo(selectedOption) {
    setSelectedState({
      id: selectedOption.label,
      value: selectedOption.value,
    });
    setSelectedStateCod(selectedOption.value.coordinates);
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.setView(
      selectedOption.value.coordinates[0][0].length > 2
        ? selectedOption.value.coordinates[0][0][0]
        : selectedOption.value.coordinates[0][0],
      14
    );
  }
  return (
    <div className="App">
      <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon
          pathOptions={purpleOptions}
          positions={
            selectedCountryCod && selectedCountryCod.length > 0
              ? selectedCountryCod
              : []
          }
        />
        <Polygon
          pathOptions={blackOptions}
          positions={
            selectedStateCod && selectedStateCod.length > 0
              ? selectedStateCod
              : []
          }
        />
      </Map>
      <div className="sidebar">
        <Label>countries</Label>
        <Select
          options={countryOptions}
          value={selectedCountry?.id ? selectedCountry?.id : 'Select a country' }
          onChange={handleCountrySelect}
          placeholder="Select a country"
          />
        <Label className="mt-1">state</Label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={handleOnFlyTo}
          placeholder="Select a state"
        />
        {/* <h2>Disney World</h2>
        <p>Bay Lake, FL</p>
        <ul>
          <li>Lat: 28.3852</li>
          <li>Long: -81.5639</li>
        </ul>
        <p>
          <button onClick={handleOnSetView}>Set View to Disney World</button>
        </p>
        <h2>Disneyland</h2>
        <p>Anaheim, CA</p>
        <ul>
          <li>Lat: 33.8121</li>
          <li>Long: -117.9190</li>
        </ul>
        <p>
          <button onClick={handleOnFlyTo}>Fly to Disneyland</button>
        </p> */}
      </div>
    </div>
  );
}

export default App;
