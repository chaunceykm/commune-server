'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
      over13: DataTypes.BOOLEAN,
      genderIdentity: DataTypes.STRING,
      preferredPronouns: DataTypes.STRING,
      bio: DataTypes.TEXT,
      profilePicture: DataTypes.STRING,
      photos: DataTypes.ARRAY(DataTypes.TEXT),
      specialInterests: DataTypes.ARRAY(DataTypes.TEXT),
      areasOfService: DataTypes.ARRAY(DataTypes.TEXT),
      areasOfNeed: DataTypes.ARRAY(DataTypes.TEXT),
      groups: DataTypes.ARRAY(DataTypes.TEXT),
      connections: DataTypes.ARRAY(DataTypes.TEXT),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};