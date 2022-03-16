const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const checkAuth = require("../middleware/auth-check.middleware");

// Login.
router.post("/login", userController.login);

// Create and Save a new post
router.post("/signup", userController.create);

// Find a single user with an id
router.get("/:userId", userController.findOne);

// Update a user by the id in the request
router.patch("/:userId", checkAuth, userController.update);

// Delete a post with the specified id in the request
router.delete("/:userId", checkAuth, userController.delete);

// Delete all posts from the database.
router.delete("/", checkAuth, userController.deleteAll);

module.exports = router;
