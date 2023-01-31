const db = require("../config/database.js");
const Sequelize = require("sequelize");

const News = db.define("news", {
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    desc: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    },
      {
        // Freeze Table Name
        freezeTableName: true,
        timestamps: false,
      });

module.exports = News;