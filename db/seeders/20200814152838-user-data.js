"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          firstName: "Kristen",
          lastName: "Chauncey",
          userName: "kchauncey",
          email: "kristen.michelle82@gmail.com",
          hashedPassword: "password",
          over13: true,
          genderIdentity: 'female',
          preferredPronouns: 'she/her',
          bio: "",
          profilePicture: "",
          photos: [""],
          specialInterests: [""],
          areasOfService: [""],
          areasOfNeed: [""],
          groups: [""],
          connections: [""],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          firstName: "Bobby",
          lastName: "McGee",
          userName: "bmcgee",
          email: "bmcg@email.com",
          hashedPassword: "password",
          over13: false,
          genderIdentity: 'male',
          preferredPronouns: 'he/him',
          bio: "",
          profilePicture: "",
          photos: [""],
          specialInterests: [""],
          areasOfService: [""],
          areasOfNeed: [""],
          groups: [""],
          connections: [""],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          firstName: "Laurie",
          lastName: "Ryan",
          userName: "lryan",
          email: "lryan@email.com",
          hashedPassword: "password",
          over13: true,
          genderIdentity: 'female',
          preferredPronouns: 'she/her',
          bio: "",
          profilePicture: "",
          photos: [""],
          specialInterests: [""],
          areasOfService: [""],
          areasOfNeed: [""],
          groups: [""],
          connections: [""],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          firstName: "Sarah",
          lastName: "Connor",
          userName: "sconnor",
          email: "sconnor@email.com",
          hashedPassword: "password",
          over13: false,
          genderIdentity: 'asexual',
          preferredPronouns: 'they/them',
          bio: "",
          profilePicture: "",
          photos: [""],
          specialInterests: [""],
          areasOfService: [""],
          areasOfNeed: [""],
          groups: [""],
          connections: [""],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
