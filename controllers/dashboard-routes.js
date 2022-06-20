const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

// Gets all of the user's posts - will send the user to the login screen if they aren't logged in
router.get("/", withAuth, (req, res) => {
  // Returns all posts in the database belonging to the user
  Post.findAll({
    // Only returns the user's posts based on the user_id saved in the session
    where: {
      user_id: req.session.user_id,
    },
    // Specifies which attributes to retrieve
    attributes: ["id", "title", "content", "createdAt", "updatedAt"],
    // Orders the posts by when they were last updated
    order: [["updatedAt", "DESC"]],
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
      // Passes an object contatining the posts and the loggedIn property to the dashboard handlebars
      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
