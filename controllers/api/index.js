const router = require("express").Router();

// Bring in all the api routes
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// Set up use of each api route
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

// Export all routes from index
module.exports = router;
