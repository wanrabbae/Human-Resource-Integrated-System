'use strict';
const Role = require("../models/Role.js");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await Role.bulkCreate([
      {
        name: "superadmin",
      },
      {
        name: "admin"
      },
      {
        name: "subadmin"
      },
      {
       name: "subsdiary" 
      },
      {
        name: "employee" 
       },
     ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await Role.destroy({ where: {}, truncate: true });
     await queryInterface.bulkDelete('roles', null, {});
  }
};
