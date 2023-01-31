'use strict';
const EmployeeStatus = require("../models/Employeestatus.js");
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

     await EmployeeStatus.bulkCreate([
      {
        name: "Permanent",
      },
      {
        name: "Contract"
      },
      {
        name: "Full Time"
      },
      {
       name: "Part Time" 
      },
      {
        name: "Internship"
      },
      {
        name: "Freelance"
      },
      {
        name: "Probation"
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await EmployeeStatus.destroy({ where: {}, truncate: true });
     await queryInterface.bulkDelete('employeestatuses', null, {});
  }
};
