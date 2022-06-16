const router = require("express").Router();
const { Post } = require("../../models");

// GET /api/posts - gets all posts in the database
router.get("/", (req, res) => {
  // Returns all posts in the database
  Post.findAll({})
    // Returns the post info for all posts
    .then((postData) => res.json(postData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// GET /api/posts/:id - gets a specific post in the database
router.get("/:id", (req, res) => {
  // Returns a specific post from the database
  Post.findOne({
    // Specifies the primary key of the desired post
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      // Checks if the post at the specified ID exists - sends an error if they don't
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // Returns the post info
      res.json(postData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// POST /api/posts - adds a new post to the database
router.post("/", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have all the pertinent information to create a new post (postname and password)
  Post.create(req.body)
    .then((postData) => res.json(postData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// PUT /api/posts/:id - updates a specific post in the database
router.put("/:id", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have any pertinent information to update the post (postname, password, or both)
  Post.update(req.body, {
    // Indicates which post to update
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      // Checks if the post at the specified ID exists - sends an error if they don't
      if (!postData[0]) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // Will return the updated post info
      res.json(postData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// DELETE /api/posts/:id - deletes a specific post in the database
router.delete("/:id", (req, res) => {
  Post.destroy({
    // Indicates which post to update
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      // Checks if the post at the specified ID exists - sends an error if they don't
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // Will return the number of changed rows
      res.json(postData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
