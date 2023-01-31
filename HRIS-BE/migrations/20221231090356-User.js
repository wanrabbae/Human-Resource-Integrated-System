'use strict';
const User = require ("../models/User.js");
const bcrypt = require("bcrypt")

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await User.create({
      role_id: 1,
      name: "superadmin",
      username: "superadmn",
      password: await bcrypt.hash("superadmin123", 12).then((hash) => {
        return hash;
      }),
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await User.destroy({ where: {}, truncate: true });
     await queryInterface.bulkDelete('users', null, {});
  }
};
