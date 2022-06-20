const router = require("express").Router();
const { Comment } = require("../../models");

// GET /api/comments - gets all comments in the database
router.get("/", (req, res) => {
  // Returns all comments in the database
  Comment.findAll({})
    // Returns the comment info for all comments
    .then((commentData) => res.json(commentData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// GET /api/comments/:id - gets a specific comment in the database
router.get("/:id", (req, res) => {
  // Returns a specific comment from the database
  Comment.findOne({
    // Specifies the primary key of the desired comment
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      // Checks if the comment at the specified ID exists - sends an error if they don't
      if (!commentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      // Returns the comment info
      res.json(commentData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// comment /api/comments - adds a new comment to the database
router.post("/", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have all the pertinent information to create a new comment (commentname and password)
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((commentData) => res.json(commentData))
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// PUT /api/comments/:id - updates a specific comment in the database
router.put("/:id", (req, res) => {
  // req.body is used because the body of the JSON object being passed through the route should have any pertinent information to update the comment (commentname, password, or both)
  Comment.update(req.body, {
    // Indicates which comment to update
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      // Checks if the comment at the specified ID exists - sends an error if they don't
      if (!commentData[0]) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      // Will return the updated comment info
      res.json(commentData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

// DELETE /api/comments/:id - deletes a specific comment in the database
router.delete("/:id", (req, res) => {
  Comment.destroy({
    // Indicates which comment to update
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      // Checks if the comment at the specified ID exists - sends an error if they don't
      if (!commentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      // Will return the number of changed rows
      res.json(commentData);
    })
    // Basic error catching
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
