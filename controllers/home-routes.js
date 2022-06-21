const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Gets all posts stored in the database and displays them on the homepage
router.get("/", (req, res) => {
  // Returns all posts in the database
  Post.findAll({
    // Specifies which attributes to retrieve
    attributes: ["id", "title", "content", "createdAt", "updatedAt"],
    // Orders the posts by when they were last updated
    order: [["updated_at", "DESC"]],
    // Includes the username with each of the posts
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // Passes an object contatining the posts and the loggedIn property to the homepage handlebars
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

// Route for the login page
router.get("/login", (req, res) => {
  // Will redirect the user to the homepage if they're already logged in
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  // Will display the login page using the login handlebars - login set to true will render the page with a login button at the bottom
  res.render("login", {
    login: true,
  });
});

// Will display the signup page using the login handlebars - login set to false will render the page with a signup button at the bottom
router.get("/signup", (req, res) => {
  res.render("login", {
    login: false,
  });
});

// GET /post/:id - gets a specific post in the database to be viewed on a single post page
router.get("/post/:id", (req, res) => {
  // Returns a specific post from the database
  Post.findOne({
    // Specifies the primary key of the desired post
    where: {
      id: req.params.id,
    },
    include: [
      // Includes the User info with the post
      {
        model: User,
        // Does not return their passwords
        attributes: { exclude: ["password"] },
      },
      // Includes the Comment info with the post
      {
        model: Comment,
        // Includes the User info with each comment
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

      const post = postData.get({ plain: true });

      // Will display the post/:id page using the existing-post handlebars - currentUser is used to provide options specific to the current user, allowing them to modify their posts and comments
      res.render("existing-post", {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: req.session.user_id,
      });
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// GET /post/:id - gets a specific post in the database to be viewed on a single post page
router.get("/edit/:id", withAuth, (req, res) => {
  // Returns a specific post from the database
  Post.findOne({
    // Specifies the primary key of the desired post
    where: {
      id: req.params.id,
    },
    include: [
      // Includes the User info with the post
      {
        model: User,
        // Does not return their passwords
        attributes: { exclude: ["password"] },
      },
      // Includes the Comment info with the post
      {
        model: Comment,
        // Includes the User info with each comment
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

      const post = postData.get({ plain: true });

      // Will only display the edit post page if the
      if (post.user_id === req.session.user_id) {
        // Will display the edit page using the edit-post handlebars - currentUser is used to provide options specific to the current user, allowing them to modify their posts and comments
        res.render("edit-post", {
          post,
          loggedIn: req.session.loggedIn,
          currentUser: req.session.user_id,
        });
      } else {
        // Will redirect to the single post page for the same post if the user isn't the post owner
        res.redirect("/post/" + req.params.id);
      }
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
