import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className={classes["main-navigation__menu-btn"]}>
        <span />
        <span />
        <span />
      </button>
      <h1 className={classes["main-navigation__title"]}>
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav>.</nav>
    </MainHeader>
  );
};

export default MainNavigation;
