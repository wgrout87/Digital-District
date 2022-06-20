const router = require("express").Router();

// Bring in all the routes
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes");
const newPostRoutes = require("./posted-routes");

// Set up use of each route
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/post", newPostRoutes);
router.use("/api", apiRoutes);

// 404 error for bad routes
router.use((req, res) => {
  res.status(404).end();
});

// Export all routes from index
module.exports = router;
