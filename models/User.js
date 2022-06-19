const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Creates a model (table) for User data
class User extends Model {
  // Establishes a method to check passwords for any User instance
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializes a user table
User.init(
  {
    // ID (primary key) column - an integer that auto-increments and cannot be null
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Username column - a string that cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Password column - a string that cannot be null and with validation
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // The password must be at least 8 characters long
        len: [8],
      },
    },
  },
  {
    hooks: {
      // bcrypt hashing for password security - will hash the password before a new user is created
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // bcrypt hashing for password security - will hash the password before a user is updated
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
