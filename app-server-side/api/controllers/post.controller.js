const Post = require("../models/post.model");
const mongoose = require("mongoose");
const fs = require("fs");
const moment = require("moment");

const apiPath = "http://localhost:8081/uploads/";

// Create and Save a new post
exports.create = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    desc: req.body.desc,
    article: req.body.article,
    user: req.body.user,
    image: req.file.filename,
    tag: req.body.tag,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post was Created",
        createdPost: {
          _id: result._id,
          title: result.title,
          desc: result.desc,
          article: result.article,
          user: result.user,
          image: apiPath + result.image,
          tag: result.tag,
          views: result.views,
          likes: result.likes,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res, next) => {
  Post.find()
    .select("_id title desc article user createdAt views likes tag image")
    .populate("tag", "name")
    .populate("user", "firstname lastname username email")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        posts: results.map((result) => {
          var m = moment(result.createdAt, "YYYY-MM-DDTHH:mm:ss.SSSZZ").format(
            "dddd, MM YYYY"
          );
          return {
            _id: result._id,
            title: result.title,
            desc: result.desc,
            article: result.article,
            user: result.user,
            image: apiPath + result.image,
            createdAt: m,
            tag: result.tag,
            views: result.views,
            likes: result.likes,
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

// Retrieve all posts from the database.
exports.findMaxViews = (req, res, next) => {
  Post.find()
    .sort("-views")
    .limit(1)
    .select("_id title desc article user createdAt views likes tag image")
    .populate("tag", "name")
    .populate("user", "firstname lastname username email")
    .exec()
    .then((result) => {
      var m = moment(result[0].createdAt, "YYYY-MM-DDTHH:mm:ss.SSSZZ").format(
        "dddd, MM YYYY"
      );
      res.status(200).json({
        post: {
          _id: result[0]._id,
          title: result[0].title,
          desc: result[0].desc,
          article: result[0].article,
          user: result[0].user,
          image: apiPath + result[0].image,
          createdAt: m,
          tag: result[0].tag,
          views: result[0].views + 1,
          likes: result[0].likes,
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

// Retrieve all posts from the database.
exports.newPosts = (req, res, next) => {
  Post.find()
    .sort("-createdAt")
    .limit(3)
    .select("_id title desc article user views likes tag image createdAt")
    .populate("tag", "name")
    .populate("user", "firstname lastname username email")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        posts: results.map((result) => {
          var m = moment(result.createdAt, "YYYY-MM-DDTHH:mm:ss.SSSZZ").format(
            "dddd, MM YYYY"
          );
          return {
            _id: result._id,
            title: result.title,
            desc: result.desc,
            article: result.article,
            user: result.user,
            image: apiPath + result.image,
            createdAt: m,
            tag: result.tag,
            views: result.views,
            likes: result.likes,
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
  const id = req.params.postId;

  Post.findById(id)
    .select("_id title desc article user views likes tag image createdAt")
    .populate("user", "firstname lastname username email")
    .populate("tag", "name")
    .exec()
    .then((result) => {
      if (result) {
        Post.findByIdAndUpdate(
          { _id: result._id },
          { views: result.views + 1 },
          {
            useFindAndModify: false,
          }
        )
          .exec()
          .then(() => {
            var m = moment(
              result.createdAt,
              "YYYY-MM-DDTHH:mm:ss.SSSZZ"
            ).format("dddd, MM YYYY");
            res.status(200).json({
              post: {
                _id: result._id,
                title: result.title,
                desc: result.desc,
                article: result.article,
                user: result.user,
                image: apiPath + result.image,
                createdAt: m,
                tag: result.tag,
                views: result.views + 1,
                likes: result.likes,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
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
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.postId;

  Post.findByIdAndUpdate({ _id: id }, req.body, { useFindAndModify: false })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post was Updated",
        updatedPost: {
          _id: result._id,
          title: result.title,
          desc: result.desc,
          article: result.article,
          user: result.user,
          image: result.image,
          tag: result.tag,
          views: result.views,
          likes: result.likes,
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
  const id = req.params.postId;
  const image = req.params.image;

  const path = "./uploads/" + image;

  Post.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post Deleted",
      });
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        } else console.log("file deleted");
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete all posts from the database.
exports.deleteAll = (req, res, next) => {
  Post.deleteMany()
    .exec()
    .then((result) => {
      const directory = "./uploads/";
      res.status(200).json({
        message: "All Posts Deleted",
      });

      fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(directory + file, (err) => {
            if (err) throw err;
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// find with tags name
exports.findByTag = (req, res, next) => {
  const tags = req.body.tags;

  Post.find({ tag: { $in: tags } })
    .populate("user", "firstname lastname username email")
    .populate("tag")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    });
};
