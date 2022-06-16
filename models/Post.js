const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Creates a model (table) for Post data
class Post extends Model {}

// Initializes a post table
Post.init(
  {
    // ID (primary key) column - an integer that auto-increments and cannot be null
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title column - a string that cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Content column - text (can be larger than a string) that cannot be null
    content: {
      type: DataTypes.TEXT,
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
