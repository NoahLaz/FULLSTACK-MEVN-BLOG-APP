const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const checkAuth = require("../middleware/auth-check.middleware");

// Retrieve all posts from the database.
router.get("/", tagController.findAll);

// Create and Save a new post
router.post("/", checkAuth, tagController.create);

// Find a single post with an id
router.get("/:tagId", tagController.findOne);

// Update a post by the id in the request
router.patch("/:tagId", checkAuth, tagController.update);

// Delete a post with the specified id in the request
router.delete("/:tagId", checkAuth, tagController.delete);

// Delete all posts from the database.
router.delete("/", checkAuth, tagController.deleteAll);

module.exports = router;
