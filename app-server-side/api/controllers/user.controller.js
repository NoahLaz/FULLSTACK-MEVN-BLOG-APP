const User = require("../models/user.model");
const mongoose = require("mongoose");
const userRoute = "http://localhost:8081/users/";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(200).json({
          message: "User Already Exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "user Created",
                  createdUser: {
                    message: "user created",
                    request: {
                      type: "GET",
                      url: userRoute + user._id,
                    },
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    });
};

// Login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth Successful",
            user: {
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.lastname,
            },
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Find a single post with an id
exports.findOne = (req, res, next) => {
  User.findById(req.params.userId)
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          user: {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided Id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body.name, { useFindAndModify: false })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "user was Updated",
        updatedUser: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "user Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res, next) => {
  User.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "All users Deleted",
        request: {
          type: "GET",
          url: userRoute,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
