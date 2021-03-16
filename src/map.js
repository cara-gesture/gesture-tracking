import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import mapStyle from "./GoogleMapStyle";
import PinBlue from "./PinBlue.png";
import PinGold from "./PinGold.png";
/*global google*/

const mapStyles = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "50vh",
  maxHeight: "50vh",
  minWidth: "50vw",
  minHeight: "40vh",
  position: "static !important",
  margin: "none",
};
const MapContainer = (props) => {
  const [initCenter] = useState({
    lat: 40.749419041103586,
    lng: -74.0017082356,
  });
  const [runLat, setRunLat] = useState(40.749419041103586);
  const [runLng, setRunLng] = useState(-74.0017082356);
  const [dropLat, setDropLat] = useState(40.749419041103586);
  const [dropLng, setDropLng] = useState(-74.0017082356);

  const handleLoc = (loc) => {
    let arr = loc.split(",");
    let lat = Number(arr[0]);
    let long = Number(arr[1]);
    return [lat, long];
  };

  useEffect(() => {
    if (props.track === true) {
      setRunLat(handleLoc(props.runLoc)[0]);
      setRunLng(handleLoc(props.runLoc)[1]);
      setDropLat(handleLoc(props.dropLoc)[0]);
      setDropLng(handleLoc(props.dropLoc)[1]);
    }
  }, [props.runLoc, props.dropLoc, props.track]);

  var points = [
    { lat: runLat, lng: runLng },
    { lat: dropLat, lng: dropLng },
  ];

  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
  }

  return props.track === true ? (
    <Map
      google={props.google}
      zoom={13}
      styles={props.mapStyle}
      disableDefaultUI={true}
      style={mapStyles}
      scrollwheel={false}
      gestureHandling={"none"}
      bounds={bounds}
      initialCenter={initCenter}
    >
      <Marker
        label={{
          text: "Our G-Runner",
          style: { backgroundColor: "white" },
          className: "labels",
        }}
        title={"Our G-Runner"}
        name={"Our G-Runner"}
        icon={{
          url: PinBlue,
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(30, 40),
          labelOrigin: new google.maps.Point(10, -12),
        }}
        position={{
          lat: handleLoc(props.runLoc)[0],
          lng: handleLoc(props.runLoc)[1],
        }}
      >
        <InfoWindow visible={true}>
          <div>Runner</div>
        </InfoWindow>
      </Marker>
      <Marker
        label={{
          text: "Your Delivery Location",
          style: { backgroundColor: "white" },
          className: "labels",
        }}
        title={"Your Delivery Location"}
        name={"Your Delivery Location"}
        icon={{
          url: PinGold,
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(28, 37),
          labelOrigin: new google.maps.Point(10, -12),
        }}
        position={{
          lat: handleLoc(props.dropLoc)[0],
          lng: handleLoc(props.dropLoc)[1],
        }}
      />
    </Map>
  ) : (
    <Map
      google={props.google}
      zoom={13}
      styles={props.mapStyle}
      disableDefaultUI={true}
      style={mapStyles}
      scrollwheel={false}
      gestureHandling={"none"}
      initialCenter={initCenter}
    >
      <Marker
        label={{
          text: "Currently not trackable",
          style: { backgroundColor: "white" },
          className: "noTrack",
        }}
        icon={{
          url: PinBlue,
          anchor: new google.maps.Point(17, 46),
          scaledSize: new google.maps.Size(0, 0),
          labelOrigin: new google.maps.Point(0, 40),
        }}
        position={{
          lat: 40.749419041103586,
          lng: -74.0017082356,
        }}
      ></Marker>
    </Map>
  );
};
MapContainer.defaultProps = mapStyle;
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
