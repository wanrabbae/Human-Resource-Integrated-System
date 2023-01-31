const {
  Document,
  DetailDocument,
  FieldDocument,
  DocumentAnswer,
} = require("../models/Document.js");
const Employee = require("../models/Employee.js");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../config/database");

module.exports.getDocument = async (req, res) => {
  try {
    let result;

    if (req.query.id) {
      result = await Document.findOne({
        order: [
          [{ model: DetailDocument, as: "detail_documents" }, "id", "ASC"],
        ],
        include: {
          model: DetailDocument,
          as: "detail_documents",
          include: {
            model: FieldDocument,
          },
        },
        where: {
          id: req.query.id,
        },
      });
      result.delegated_to != null
        ? (result.delegated_to = JSON.parse(result.delegated_to))
        : null;
      const showto = result.delegated_to;
      let findEmployee = [];

      for (var i = 0; i < showto.length; i++) {
        const findEmployee2 = await Employee.findAll({
          where: { id: showto[i] },
          attributes: ["id", "firstName"],
          raw: true,
          nest: true,
        });
        // findEmployee.push(findEmployee2);
        findEmployee2.map((emp) => {
          findEmployee.push({
            id: emp.id,
            firstName: emp.firstName,
            value: emp.id,
            label: emp.firstName,
          });
        });
      }
      result.delegated_to = findEmployee;
    }else if(req.query.keyword) {
      result = await Document.findAll({
        where: {
          title: {[Op.like]: `%${req.query.keyword}%`},
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    } else {
      result = await Document.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    }

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};

module.exports.getEmployeeDocument = async (req, res) => {
  try {
    let result;
    const employeeId = req.userData.employee.id;

    if (req.query.id) {
      result = await Document.findOne({
        include: {
          model: DetailDocument,
          include: {
            model: FieldDocument,
          },
        },
        where: {
          id: req.query.id,
        },
      });
      result.delegated_to != null
        ? (result.delegated_to = JSON.parse(result.delegated_to))
        : null;
      const showto = result.delegated_to;
      let findEmployee = [];

      for (var i = 0; i < showto.length; i++) {
        const findEmployee2 = await Employee.findAll({
          where: { id: showto[i] },
          attributes: ["id", "firstName"],
          raw: true,
          nest: true,
        });
        // findEmployee.push(findEmployee2);
        findEmployee2.map((emp) => {
          findEmployee.push({
            id: emp.id,
            firstName: emp.firstName,
            value: emp.id,
            label: emp.firstName,
          });
        });
      }
      result.delegated_to = findEmployee;
    } else {
      let employeeDoc = [];
      result = await Document.findAll({
        // where: {
        //     delegated_to: {
        //         [Op.in]: [`${employeeId}`]
        //     }
        // }
      });
      result.map((res) => {
        res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
        // employeeDoc.push(res.delegated_to);

        const cari = res.delegated_to.find((id) => id == employeeId);
        if (cari) {
          employeeDoc.push(res);
        }
      });
      result = employeeDoc;
    }

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};

module.exports.addDocument = async (req, res) => {
  try {
    const result = await Document.create({
      title: req.body.title,
      description: req.body.description,
      unique_id: req.userData.unique_id,
      delegated_to: req.body.delegated_to,
    });
    res.status(201).json(
      result
        ? {
            message: "Success Create",
            data: result,
          }
        : {
            message: "Error Create",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.deleteDocument = async (req, res) => {
  try {
    const result = await Document.destroy({
      where: {
        id: req.query.id,
      },
    });

    const findDetail = await DetailDocument.findOne({
      where: {
        document_id: req.query.id,
      },
    });

    if (findDetail) {
      const deleteDetail = await DetailDocument.destroy({
        where: {
          document_id: req.query.id,
        },
      });

      const findField = await FieldDocument.findOne({
        where: {
          id_detail_document: findDetail.id,
        },
      });

      if (findField) {
        const deleteField = await FieldDocument.destroy({
          where: {
            id_detail_document: findDetail.id,
          },
        });
      }
    }

    res.json(
      result
        ? {
            message: "Success deleting",
          }
        : {
            message: "Error Deleting",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.updateDocument = async (req, res) => {
  try {
    const result = await Document.update(
      {
        title: req.body.title,
        description: req.body.description,
        delegated_to: req.body.delegated_to,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.json(
      result
        ? {
            message: "Success Updating",
          }
        : {
            message: "Error Updating",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.addDocumentDetail = async (req, res) => {
  try {
    const checkDok = await Document.findOne({
      where: {
        id: req.body.document_id,
      },
    });

    const result = await DetailDocument.create({
      document_id: req.body.document_id,
      field_name: req.body.field_name,
      field_type: req.body.field_type,
      data_type: req.body.data_type,
    });
    res.status(201).json(
      result
        ? {
            message: "Success Create",
            data: result,
          }
        : {
            message: "Error Create",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.deleteDocumentDetail = async (req, res) => {
  try {
    const result = await DetailDocument.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.json(
      result
        ? {
            message: "Success deleting",
          }
        : {
            message: "Error Deleting",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.updateDocumentDetail = async (req, res) => {
  try {
    const result = await DetailDocument.update(
      {
        document_id: req.body.document_id,
        field_name: req.body.field_name,
        field_type: req.body.field_type,
        data_type: req.body.data_type,
      },
      { where: { id: req.body.id } }
    );

    res.status(201).json(
      result
        ? {
            message: "Success Edit",
          }
        : {
            message: "Error Edit",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.addFieldDocument = async (req, res) => {
  try {
    const result = await FieldDocument.create({
      id_detail_document: req.body.id_detail_document,
      name: req.body.name,
    });
    res.status(201).json(
      result
        ? {
            message: "Success Create",
            data: result,
          }
        : {
            message: "Error Create",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.deleteFieldDocument = async (req, res) => {
  try {
    const result = await FieldDocument.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.json(
      result
        ? {
            message: "Success deleting",
          }
        : {
            message: "Error Deleting",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.updateFieldDocument = async (req, res) => {
  try {
    const result = await FieldDocument.update(
      {
        id_detail_document: req.body.id_detail_document,
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    );

    res.status(201).json(
      result
        ? {
            message: "Success Edit",
          }
        : {
            message: "Error Edit",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.addAnswer = async (req, res) => {
  try {
    let value = req.body.value;
    if (req.files) {
      req.files.map((file) => {
        const tempPath = file.path;
        value = file.filename + "." + file.mimetype.split("/")[1];
        const targetPath = path.join(`assets/documents/${value}`);
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);
        });
      })
    }

    const result = await DocumentAnswer.create({
      employeeId: req.userData.employee.id,
      id_detail_document: req.body.id_detail_document,
      value: value,
    });
    res.status(201).json({
      message: "Success Create",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

module.exports.openDocWithAnswer = async (req, res) => {
  try {
    // const findDoc = await Document.findOne({
    //     where: {
    //         id: req.params.id_document,
    //     }
    // });

    // const findDocDetail = await DetailDocument.findAll({
    //     where: {
    //         document_id: findDoc.id,
    //     },
    //     include:
    // });

    // findDocDetail.map(async (detail) => {
    //     const findAnswer = await DocumentAnswer.findAll({
    //         where: {
    //             id_detail_document: detail.id,
    //             employeeId: req.params.id_employee,
    //         }
    //     });

    //     findAnswer.map(answer => {
    //         if(answer.id_detail_document == detail.id && answer.employeeId == req.params.id_employee) {
    //             detail.data_type = answer
    //         }
    //     })
    //     // if (findAnswer) {
    //     //     detail.document_answers = findAnswer;
    //     // }
    //     // detail.setDataValue("document_answers", findAnswer)
    // })

    let result = await Document.findOne({
      order: [[{ model: DetailDocument, as: "detail_documents" }, "id", "ASC"]],
      include: {
        model: DetailDocument,
        as: "detail_documents",
        include: [
          {
            model: FieldDocument,
          },
          {
            model: DocumentAnswer,
            where: {
              employeeId: req.params.id_employee,
            },
          },
        ],
      },
      where: {
        id: req.params.id_document,
      },
    });

    // findDoc.setDataValue("detail_documents", findDocDetail);

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};

module.exports.getAnswerByIdDetailDoc = async (req, res) => {
  try {
    const result = await DocumentAnswer.findAll({
      where: {
        id_detail_document: req.params.id,
      },
    });
    res.status(200).json(
      result
        ? {
            message: "Success",
            data: result,
          }
        : {
            message: "Error Create",
          }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};

module.exports.getStatisticDoc = async (req, res) => {
  const { id } = req.params;

  try {
    let result = {
      multiple_choice: [],
      dropdown: [],
      option: [],
      short_answer: [],
      paragraph: [],
      files: [],
      dates: [],
      times: {},
    };
    if (!id) {
      return res.errorBadRequest("id is required (document id)");
    }

    const data = await DetailDocument.findAll({
      where: {
        document_id: id,
      },
      include: [
        {
          model: DocumentAnswer,
        },
        {
          model: FieldDocument,
        },
      ],
      raw: true,
      nest: true,
    });
    const findCheckBox = data.find((dt) => dt.field_type == "checkbox");
    console.log(findCheckBox);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.field_type == "short_answer") {
        result.short_answer.push(element.document_answers.value);
      } else if (element.field_type == "paragraph") {
        result.paragraph.push(element.document_answers.value);
      } else if (element.field_type == "file") {
        result.files.push({
          filename: element.document_answers.value,
          type: element.document_answers.value.split(".")[1],
          link: `${req.protocol}://${req.get("host")}/assets/documents/${
            element.document_answers.value
          }`,
        });
      } else if (element.field_type == "checkbox") {
        let dataMulti = [];
        dataMulti.push(element.field_name);
        const findMulti = dataMulti.find((dm) => dm == element.field_name);
        console.log(findMulti);
        // result.multiple_choice.push()
      } else if (element.field_type == "time") {
        const split = element.document_answers.value.split(":")[0];
        result.times[split] = element.document_answers.value;
      }
    }

    return res.jsonData(result);
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.filterDocument = async (req, res) => {
  try {
    let result = [];

    if(req.body.name == "Latest Document") {
      result = await Document.findAll({
        order: [["id", "DESC"]],
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    }else if(req.body.name == "Longest Document") {
      result = await Document.findAll({
        order: [["id", "ASC"]],
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    }else if(req.body.name == "Last Modified by me") {
      result = await Document.findAll({
        order: [["id", "DESC"]],
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    }else if(req.body.name == "title") {
      result = await Document.findAll({
        order: [["title", "ASC"]],
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    } else {
      result = await Document.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
               
            },
            {
              unique_id: null,
            },
          ],
        },
      });
      result.map((res) => {
        return res.delegated_to != null
          ? (res.delegated_to = JSON.parse(res.delegated_to))
          : null;
      });
    }

    res.jsonData(result)
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}