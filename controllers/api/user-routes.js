const router = require("express").Router();
const { User } = require("../../models");

// GET /api/users - gets all users in the database
router.get("/", (req, res) => {
  // Returns all users in the database
  User.findAll({
    // Does not return their passwords
    attributes: { exclude: ["password"] },
  })
    // Returns the user info for all users
    .then((dbUserData) => res.json(dbUserData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// GET /api/users/:id - gets a specific user in the database
router.get("/:id", (req, res) => {
  // Returns a specific user from the database
  User.findOne({
    // Does not return their password
    attributes: { exclude: ["password"] },
    // Specifies the primary key of the desired user
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Returns the user info
      res.json(dbUserData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// POST /api/users - adds a new user to the database
router.post("/", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have all the pertinent information to create a new user (username and password)
  User.create(req.body)
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        // Establishes a loggedIn variable and sets it to true
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// PUT /api/users/:id - updates a specific user in the database
router.put("/:id", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have any pertinent information to update the user (username, password, or both)
  User.update(req.body, {
    // This hook will hash the password if it is being updated
    individualHooks: true,
    // Indicates which user to update
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Will return the updated user info
      res.json(dbUserData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// DELETE /api/users/:id - deletes a specific user in the database
router.delete("/:id", (req, res) => {
  User.destroy({
    // Indicates which user to update
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Will return the number of changed rows
      res.json(dbUserData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
