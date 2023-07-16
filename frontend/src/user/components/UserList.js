import React from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import UserItem from "./UserItem";
import classes from "./UserList.module.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={classes.center}>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["users-list"]}>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
