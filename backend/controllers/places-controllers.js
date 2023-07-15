const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

// Controllers have the middleware functions and the logic.

let DUMMY_PLACES = [
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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong!", 500);
    return next(error);
  }
  if (!place) {
    const error = new HttpError(
      "Couldn't find a place for the provided id",
      404
    );
    return next(error);
    // res
    //   .status(404)
    //   .json({ message: "Couldn't find a place for the provided id" });
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Fetching places failed", 500);
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(
      new HttpError("Couldn't find a place for the provided user id"),
      404
    );
    // res
    //   .status(404)
    //   .json({ message: "Couldn't find a place for the provided user id" });
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, Please check your data", 422)
    );
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://img.freepik.com/free-photo/landscape-shot-beautiful-valley-surrounded-by-huge-mountains-with-snowy-peaks_181624-4296.jpg?w=1480&t=st=1689412597~exp=1689413197~hmac=8debf1021b39888530996465bec3332b73a614605d244ea8e528fbe68d4e1509",
    creator,
  });
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, Please check your data", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Something went wrong!", 500);
    return next(error);
  }
  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Couldn't update the place", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    await Place.findByIdAndDelete(placeId);
  } catch (err) {
    const error = new HttpError("Couldn't delete the place", 500);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Place Successfully" });
};

//We can use this kind of export when we want to export more than one function or something.
exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
