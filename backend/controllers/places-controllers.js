const HttpError = require("../models/http-error");

// Controllers have the middleware functions and the logic.

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    throw new HttpError("Couldn't find a place for the provided id", 404);
    // res
    //   .status(404)
    //   .json({ message: "Couldn't find a place for the provided id" });
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
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
};

//We can use this kind of export when we want to export more than one function or something.

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
