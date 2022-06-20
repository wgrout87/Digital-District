const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", withAuth, (req, res) => {
  res.render("new-post", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
