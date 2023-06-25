import React, { useEffect, useRef } from "react";
import classes from "./Map.module.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`${classes["map"]} ${props.className}`}
      style={props.style}
    >
      Map
    </div>
  );
};

export default Map;
