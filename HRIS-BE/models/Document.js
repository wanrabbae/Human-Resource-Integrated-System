const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const Document = db.define(
  "documents",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // Define attributes
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    delegated_to: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: true,
  }
);

const DetailDocument = db.define(
  "detail_documents",
  {
    // Define attributes
    document_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "documents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    field_name: Sequelize.STRING,
    field_type: Sequelize.STRING,
    data_type: Sequelize.STRING,
    sequence: Sequelize.INTEGER,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

const FieldDocument = db.define(
  "field_documents",
  {
    // Define attributes
    id_detail_document: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "detail_documents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

const DocumentAnswer = db.define(
  "document_answers",
  {
    // Define attributes
    employeeId: Sequelize.INTEGER,
    id_detail_document: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "detail_documents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_field_document: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "field_documents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    value: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

const Respondent = db.define(
  "respondents",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // Define attributes
    document_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "documents",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    employeeId: Sequelize.INTEGER,
    jobposition_id: Sequelize.INTEGER,
    date: Sequelize.DATE,
    time: Sequelize.TIME,
    type: Sequelize.STRING,
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    unique_id: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Document.hasMany(DetailDocument, {
  foreignKey: "document_id",
});

DetailDocument.belongsTo(Document, {
  foreignKey: "document_id",
});

DetailDocument.hasMany(FieldDocument, {
  foreignKey: "id_detail_document",
});

FieldDocument.belongsTo(DetailDocument, {
  foreignKey: "id_detail_document",
});

DetailDocument.hasMany(DocumentAnswer, {
  foreignKey: "id_detail_document",
});

DocumentAnswer.belongsTo(DetailDocument, {
  foreignKey: "id_detail_document",
});

FieldDocument.hasMany(DocumentAnswer, {
  foreignKey: "id_field_document",
});

DocumentAnswer.belongsTo(FieldDocument, {
  foreignKey: "id_field_document",
});
DocumentAnswer.belongsTo(Employee, {
  foreignKey: "employeeId",
});

Document.hasOne(Respondent, {
  foreignKey: "document_id",
  sourceKey: "id",
  as: "respondent"
});

// Export model Product
module.exports = {
  Document,
  DetailDocument,
  FieldDocument,
  DocumentAnswer,
};
