const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taj Mahal",
    description: "Most beautiful symbol of love",
    location: {
      lat: 27.1751448,
      lng: 78.0395673,
    },
    address:
      "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Couldn't find a place for the provided id", 404);
    // res
    //   .status(404)
    //   .json({ message: "Couldn't find a place for the provided id" });
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!place) {
    return next(
      new HttpError("Couldn't find a place for the provided user id"),
      404
    );
    // res
    //   .status(404)
    //   .json({ message: "Couldn't find a place for the provided user id" });
  }
  res.json({ place });
});

module.exports = router;
