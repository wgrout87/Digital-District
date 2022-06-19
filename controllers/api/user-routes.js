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
    .then((userData) => res.json(userData))
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
    .then((userData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Returns the user info
      res.json(userData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// POST /api/users - adds a new user to the database
router.post("/", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have all the pertinent information to create a new user (username and password)
  User.create(req.body)
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        // Establishes a loggedIn variable and sets it to true
        req.session.loggedIn = true;

        res.json(userData);
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
    .then((userData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!userData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Will return the updated user info
      res.json(userData);
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
    .then((userData) => {
      // Checks if the user at the specified ID exists - sends an error if they don't
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      // Will return the number of changed rows
      res.json(userData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

router.post("/login", (req, res) => {
  // expects {username: '', password: ''}
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
