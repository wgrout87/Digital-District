const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  res.render("new-post", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
