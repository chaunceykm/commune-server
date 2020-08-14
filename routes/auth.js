const express = require("express");
const bcrypt = require("bcryptjs");
const { check, oneOf } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken } = require("./auth");
const { Op } = require("sequelize");


const router = express.Router();
const db = require("../db/models");

const { User } = db;

const validateCredentials = [
  oneOf([
    check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid user name.')
    .isLength({ min: 6 })
    .withMessage('User Name should be a minimum of 6 characters'),
  ]),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post(
  "/signup",
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username"),
  validateCredentials,
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      over13,
      genderIdentity,
      preferredPronouns,
      bio,
      profilePicture,
      photos,
      specialInterests,
      areasOfService,
      areaseOfNeed,
      groups,
      connections,


    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      over13,
      genderIdentity,
      preferredPronouns,
      bio,
      profilePicture,
      photos,
      specialInterests,
      areasOfService,
      areaseOfNeed,
      groups,
      connections,
    });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

//create user token on login
router.post(
  "/login",
  [
    validateCredentials,
    handleValidationErrors,
  ],
  asyncHandler(async (req, res, next) => {
    const { email, userName, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { userName: userName }],
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

module.exports = router