import React from "react";
import UserList from "../components/UserList";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "User 1",
      image:
        "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=1600",
      places: 3,
    },
  ];
  return <UserList items={USERS} />;
};

export default User;
