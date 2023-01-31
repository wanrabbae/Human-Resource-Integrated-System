'use strict';
const Role = require("../models/Role.js");
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
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await Role.destroy({ where: {}, truncate: true });
     await queryInterface.bulkDelete('roles', null, {});
  }
};
