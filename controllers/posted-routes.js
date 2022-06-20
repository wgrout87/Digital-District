const router = require("express").Router();
const withAuth = require("../utils/auth");

// Route for adding a new post
router.get("/", withAuth, (req, res) => {
  // Will display the post page using the new-post handlebars
  res.render("new-post");
});

module.exports = router;
