const router = require("express").Router();

const homeRoutes = require("./home-routes");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes");
const newPostRoutes = require("./posted-routes");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/post", newPostRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
