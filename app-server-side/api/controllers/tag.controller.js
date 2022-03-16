const Tag = require("../models/tag.model");
const mongoose = require("mongoose");

const tagRoute = "http://localhost:8081/tags/";

// Create and Save a new tag
exports.create = (req, res, next) => {
  const tag = new Tag({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  tag
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "tag Created",
        createdTag: {
          _id: result._id,
          title: result.name,
          request: {
            type: "GET",
            url: tagRoute + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Retrieve all tags from the database.
exports.findAll = (req, res, next) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Tag.find(condition)
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        tags: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
          };
        }),
      };
      res.status(200).json(response);
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
  const id = req.params.tagId;
  Tag.findById(id)
    .select("_id name")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          post: {
            _id: doc._id,
            name: doc.name,
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

// Update a post by the id in the request
exports.update = (req, res, next) => {
  const id = req.params.tagId;
  Tag.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
      },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Tag was Updated",
        updatedTag: {
          _id: result._id,
          name: result.name,
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

// Delete a post with the specified id in the request
exports.delete = (req, res, next) => {
  id = req.params.tagId;
  Tag.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Tag Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete all tags from the database.
exports.deleteAll = (req, res, next) => {
  Tag.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "All Tags Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
