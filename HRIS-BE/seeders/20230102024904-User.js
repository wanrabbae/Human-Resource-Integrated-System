'use strict';
const User = require ("../models/User.js");
const bcrypt = require("bcrypt")
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await User.create({
      role_id: 1,
      name: "superadmin",
      username: "superadmin",
      password: await bcrypt.hash("superadmin123", 12).then((hash) => {
        return hash;
      }),
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await User.destroy({ where: {}, truncate: true });
     await queryInterface.bulkDelete('users', null, {});
  }
};
