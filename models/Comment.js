const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a model (table) for Comment data
class Comment extends Model {}

// Initializes a comment table
Comment.init(
  {
    // ID (primary key) column - an integer that auto-increments and cannot be null
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Comment_text column - a string that cannot be null
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // User_id column - integer that references the ID column of the user table
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // Post_id column - integer that references the ID column of the post table
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
