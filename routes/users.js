const express = require("express");
const { asyncHandler } = require('../utils');
const {  requireAuth } = require("../auth");
const { Op } = require("sequelize");


const router = express.Router();
const db = require("../db/models");

const { User } = db;

const userNotFoundError = (id) => {
  const err = Error("User not found");
  err.errors = [`User with id of ${id} could not be found.`];
  err.title = "User not found.";
  err.status = 404;
  return err;
};

//Get all Users
router.get(
  "/all",
  requireAuth,
  asyncHandler(async (req, res) => {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "userName", "email"],
    });
    res.json({ users });
  })
);

//Get a specific User
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        'firstName',
        'lastName',
        'userName',
        'email',
        'password',
        'over13',
        'genderIdentity',
        'preferredPronouns',
        'bio',
        'profilePicture',
        'photos',
        'specialInterests',
        'areasOfService',
        'areaseOfNeed',
        'groups',
        'connections',
      ],
    });
    if (user) {
      res.json({ user });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

//Update a User
router.put(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "firstName",
        "lastName",
        "userName",
        "email",
        "password",
        "over13",
        "genderIdentity",
        "preferredPronouns",
        "bio",
        "profilePicture",
        "photos",
        "specialInterests",
        "areasOfService",
        "areaseOfNeed",
        "groups",
        "connections",
      ],
    });

    if (user) {
      if (req.user.id != user.id) {
        //KDEV change req.body.user to req.user
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this user.";
        err.title = "Unauthorized";
        throw err;
      }
      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        over13: req.body.over13,
        genderIdentity: req.body.genderIdentity,
        preferredPronouns: req.body.preferredPronouns,
        bio: req.body.bio,
        profilePicture: req.body.profilePicture,
        photos: req.body.photos,
        specialInterests: req.body.specialInterests,
        areasOfService: req.body.areasOfService,
        areaseOfNeed: req.body.areaseOfNeed,
        groups: req.body.groups,
        connections: req.body.connections,
      });
      res.json({ user });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

//Delete a User
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      if (req.user.id != user.id) {
        //KDEV change to req.user.id
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to delete this user.";
        err.title = "Unauthorized";
        throw err;
      }
      await user.destroy();
      res.json({ message: `Deleted user with id of ${req.params.id}.` });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

module.exports = router;