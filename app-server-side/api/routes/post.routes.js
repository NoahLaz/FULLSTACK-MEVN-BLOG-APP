const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const imageHandler = require("../middleware/image.middleware");
const checkAuth = require("../middleware/auth-check.middleware");

// images handler
const upload = imageHandler;

// Retrieve all posts from the database.
router.get("/", postController.findAll);

// Retrieve the post with the most views.
router.get("/maxviews", postController.findMaxViews);

// Retrieve the post with the most views.
router.get("/newposts", postController.newPosts);

// Create and Save a new post
router.post("/", upload, postController.create);

// Find a single post with an id
router.get("/getpostbyid/:postId", postController.findOne);

// Update a post by the id in the request
router.patch("/update/:postId", checkAuth, upload, postController.update);

// Update a post by the id in the request
router.patch("/update/addview/:postId", postController.update);

// Delete a post with the specified id in the request
router.delete("/:postId&:image", checkAuth, postController.delete);

// Delete all posts from the database.
router.delete("/", postController.deleteAll);

// get posts by tag
router.post("/getpostsbytags", postController.findByTag);

module.exports = router;
