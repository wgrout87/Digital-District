const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "createdAt", "updatedAt"],
    order: [["updated_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    login: true,
  });
});

router.get("/signup", (req, res) => {
  res.render("login", {
    login: false,
  });
});

// GET /post/:id - gets a specific post in the database
router.get("/post/:id", (req, res) => {
  // Returns a specific post from the database
  Post.findOne({
    // Specifies the primary key of the desired post
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        // Does not return their passwords
        attributes: { exclude: ["password"] },
      },
      {
        model: Comment,
        include: {
          model: User,
          // Does not return their passwords
          attributes: { exclude: ["password"] },
        },
      },
    ],
  })
    .then((postData) => {
      // Checks if the post at the specified ID exists - sends an error if they don't
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = postData.get({ plain: true });

      // pass data to template
      res.render("existing-post", {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: req.session.user_id,
      });
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
