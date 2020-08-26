import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import mapStyleLight from "./mapStyleLight";
import mapStyleDark from "./mapStyleDark";
import shield from "./images/shield.png";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Switch from "./components/Switch";
import InfoSidebar from "./components/InfoSidebar";
import Footer from "./components/Footer";
import * as data from "./data/data.json";
//import Locate from "./components/Locate";

/* Map config */
const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw"
};
const center = {
  lat: 43.6532,
  lng: -79.3832
};

/* App component */
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [switchOn, setSwitchOn] = useState(true);
  const options = {
    styles: switchOn ? mapStyleLight : mapStyleDark,
    disableDefaultUI: true,
    zoomControl: true
  };

  const [selected, setSelected] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  /* Error message */
  if (loadError) return <div className="message">Something went wrong</div>;
  if (!isLoaded)
    return (
      <div className="message">
        <img src={shield} alt="laoding" />
        <div className="break"></div>
      </div>
    );

  return (
    <div>
      <Logo switchOn={switchOn} />
      <Search panTo={panTo} />
      <Switch setSwitchOn={isOn => setSwitchOn(isOn)} />
      <InfoSidebar data={data} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {data.features.map(d => (
          <Marker
            key={d.properties.PARK_ID}
            position={{
              lat: d.geometry.coordinates[1],
              lng: d.geometry.coordinates[0]
            }}
            onClick={() => {
              setSelected(d);
            }}
            icon={{
              url: switchOn ? "../locator-b.png" : "../locator-g.png",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.geometry.coordinates[1],
              lng: selected.geometry.coordinates[0]
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h3>Disinfection Completed</h3>
              <p>{selected.properties.DESCRIPTION}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <Footer />
    </div>
  );
}
