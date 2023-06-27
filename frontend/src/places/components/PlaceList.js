import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";
import classes from "./PlaceList.module.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={classes["place-list center"]}>
        <Card>
          <h2>No places found. Maybe create one ?</h2>
          <Button to="/places/new">Share Places</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
