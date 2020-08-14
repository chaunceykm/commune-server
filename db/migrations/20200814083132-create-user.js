"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      over13: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      genderIdentity: {
        type: Sequelize.STRING,
      },
      preferredPronouns: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      specialInterests: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      areasOfService: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      areasOfNeed: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      groups: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      connections: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
