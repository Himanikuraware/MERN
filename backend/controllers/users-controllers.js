const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Himani",
    email: "himani@gmail.com",
    password: "himani",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, Please check your data", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Couldn't create user, email already exists", 422);
  }

  const createduser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createduser);
  res.status(201).json({ user: createduser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Couldn't identify user, please signup if you don't have an account",
      401
    );
  }
  res.json({ message: "Logged in successfully!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
