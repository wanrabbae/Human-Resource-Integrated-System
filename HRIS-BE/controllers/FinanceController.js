const { RBSetting, CASetting, LoanSetting, Reimbursement, CashAdvance, Loan, LoanInstallment } = require("../models/FinanceModels.js")
const Employee = require("../models/Employee.js")
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../config/database.js");
const { JobPosition } = require("../models/JobModels.js");
const ReportTo = require("../models/ReportTo.js");

// pagination function
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: requests } = data;
  const currentPage = page ? +parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, requests, totalPages, currentPage };
};

const getAllRBSetting = async (req, res) => {
  try {
    const result = await RBSetting.findAll({
      where: {
        unique_id: req.userData.unique_id,
      }
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getSingleRBSetting = async (req, res) => {
  try {
    const result = await RBSetting.findByPk(req.params.id);

    if (result && result.assign_to) {
      result.assign_to = result.assign_to.split(",")
      const employees = await Employee.findAll({ where: { id: result.assign_to }, raw: true, nest: true })
      result.assign_to = employees
    }

    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addRBSetting = async (req, res) => {
  try {
    const result = await RBSetting.create({
      name: req.body.name,
      limit_amount: req.body.limit_amount,
      min_next_claim: req.body.min_next_claim,
      assign_to: req.body.assign_to,
      unique_id: req.userData.unique_id,
    });

    return res.jsonSuccessCreated("Success create RBSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteRBSetting = async (req, res) => {
  try {
    const result = await RBSetting.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete RBSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateRBSetting = async (req, res) => {
  try {
    const result = await RBSetting.update(
      {
        name: req.body.name,
        limit_amount: req.body.limit_amount,
        min_next_claim: req.body.min_next_claim,
        assign_to: req.body.assign_to,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update RBSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllCASetting = async (req, res) => {
  try {
    const result = await CASetting.findAll({
      where: {
        unique_id: req.userData.unique_id,
      }
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getSingleCASetting = async (req, res) => {
  try {
    const result = await CASetting.findByPk(req.params.id);

    if (result && result.assign_to) {
      result.assign_to = result.assign_to.split(",")
      const employees = await Employee.findAll({ where: { id: result.assign_to }, raw: true, nest: true })
      result.assign_to = employees
    }

    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addCASetting = async (req, res) => {
  try {
    const result = await CASetting.create({
      name: req.body.name,
      limit_amount: req.body.limit_amount,
      settlement_due: req.body.settlement_due,
      assign_to: req.body.assign_to,
      unique_id: req.userData.unique_id,
    });

    return res.jsonSuccessCreated("Success create CASetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteCASetting = async (req, res) => {
  try {
    const result = await CASetting.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete CASetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateCASetting = async (req, res) => {
  try {
    const result = await CASetting.update(
      {
        name: req.body.name,
        limit_amount: req.body.limit_amount,
        settlement_due: req.body.settlement_due,
        assign_to: req.body.assign_to,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update CASetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllLoanSetting = async (req, res) => {
  try {
    const result = await LoanSetting.findAll({
      where: {
        unique_id: req.userData.unique_id,
      }
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getSingleLoanSetting = async (req, res) => {
  try {
    const result = await LoanSetting.findByPk(req.params.id);

    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addLoanSetting = async (req, res) => {
  try {
    const result = await LoanSetting.create({
      name: req.body.name,
      max_installment: req.body.max_installment,
      interest: req.body.interest,
      unique_id: req.userData.unique_id,
    });

    return res.jsonSuccessCreated("Success create LoanSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteLoanSetting = async (req, res) => {
  try {
    const result = await LoanSetting.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete LoanSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateLoanSetting = async (req, res) => {
  try {
    const result = await LoanSetting.update(
      {
        name: req.body.name,
        max_installment: req.body.max_installment,
        interest: req.body.interest,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update LoanSetting");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllReimbursement = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let result = [];
    let response = null;

    if (req.query.keyword) {
      result = await Reimbursement.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: RBSetting,
          as: "reimbursement_setting",
          // where: {
          //   [Op.or]: [
          //     {
          //       name: {
          //         [Op.like]: `%${req.query.keyword}%`
          //       }
          //     }
          //   ]
          // }
        }]
      });
      result.rows.map(res => {
        if (res.file != null) {
          res.file = `${req.protocol}://${req.get('host')}/assets/finance/${res.file}`
        } else {
          res.file = null
        }
      })
      response = getPagingData(result, page, limit);
    } else if (req.query.date) {
      result = await Reimbursement.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
          use_date: new Date(req.query.date)
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: RBSetting,
          as: "reimbursement_setting",
          // where: {
          //   [Op.or]: [
          //     {
          //       name: {
          //         [Op.like]: `%${req.query.keyword}%`
          //       }
          //     }
          //   ]
          // }
        }]
      });
      result.rows.map(res => {
        if (res.file != null) {
          res.file = `${req.protocol}://${req.get('host')}/assets/finance/${res.file}`
        } else {
          res.file = null
        }
      })
      response = getPagingData(result, page, limit);
    } else if (req.query.id) {
      result = await Reimbursement.findByPk(req.query.id, {
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["id", "firstName"]
          }, {
            model: RBSetting,
            as: "reimbursement_setting"
          }
        ]
      })
      if (result) {
        if (result.file != null) {
          result.file = `${req.protocol}://${req.get('host')}/assets/finance/${result.file}`
        } else {
          result.file = null;
        }
      } else {
        result = {}
      }
    }
    else {
      result = await Reimbursement.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: RBSetting,
          as: "reimbursement_setting"
        }]
      });
      result.rows.map(res => {
        if (res.file != null) {
          res.file = `${req.protocol}://${req.get('host')}/assets/finance/${res.file}`
        } else {
          res.file = null
        }
      })

      response = getPagingData(result, page, limit);
    }
    return res.jsonData(response != null ? response : result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addReimbursement = async (req, res) => {
  try {
    let file = null;

    const findSetting = await RBSetting.findByPk(req.body.reimbursement_setting_id);

    if (findSetting) {
      if (parseInt(req.body.amount) > parseInt(findSetting.limit_amount)) return res.errorBadRequest("The policy you choose has a limit of Rp " + findSetting.limit_amount)

      if (new Date(req.body.use_date).getDate() > new Date(new Date().setDate(new Date().getDate() + findSetting.min_next_claim)).getDate()) return res.errorBadRequest(`The policy you choose has a Min Next Claim for ${findSetting.min_next_claim} days`)
    }

    if (req.file) {
      const tempPath = req.file.path;
      file =
        req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/finance/${file}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const result = await Reimbursement.create({
      employeeId: req.body.employeeId,
      reimbursement_setting_id: req.body.reimbursement_setting_id,
      amount: req.body.amount,
      use_date: req.body.use_date,
      note: req.body.note,
      file: file,
      unique_id: req.userData.unique_id
    });

    const spv = await ReportTo.findAll({
      where: {
        employeeId: req.body.employeeId
      },
      attributes: ["id", "employeeId", "reportToEmployee"],
      raw: true,
      nest: true,
    });

    if (spv && spv.length > 0) {
      spv.map(async (sp) => {
        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: sp.reportToEmployee,
          employeeId: req.body.employeeId,
          title: "New Finance Reimbursment Request",
          link: "/inbox/approval-list",
          type: "approval"
        })
      })
    }

    return res.jsonSuccessCreated("Success create Reimbursement");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteReimbursement = async (req, res) => {
  try {
    const result = await Reimbursement.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Reimbursement");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateReimbursement = async (req, res) => {
  try {
    const findData = await Reimbursement.findByPk(req.params.id)
    let file = findData.file;

    if (req.file) {
      fs.unlink(`assets/finance/${findData.file}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      const tempPath = req.file.path;
      file =
        req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/finance/${file}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const result = await Reimbursement.update(
      {
        employeeId: req.body.employeeId,
        reimbursement_setting_id: req.body.reimbursement_setting_id,
        amount: req.body.amount,
        use_date: req.body.use_date,
        note: req.body.note,
        file: file,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Reimbursement");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllCashAdvance = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let result;
    let response = null;

    if (req.query.keyword) {
      result = await CashAdvance.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: CASetting,
          as: "cash_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    } else if (req.query.date) {
      result = await CashAdvance.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
          request_date: new Date(req.query.date)
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: CASetting,
          as: "cash_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    } else if (req.query.id) {
      result = await CashAdvance.findByPk(req.query.id, {
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: CASetting,
          as: "cash_setting"
        }]
      })
    }
    else {
      result = await CashAdvance.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: CASetting,
          as: "cash_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    }

    return res.jsonData(response != null ? response : result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addCashAdvance = async (req, res) => {
  try {
    const findSetting = await CASetting.findByPk(req.body.cash_advance_setting_id);

    if (findSetting) {
      if (parseInt(req.body.amount) > parseInt(findSetting.limit_amount)) return res.errorBadRequest(`The policy you choose has a limit of Rp ${findSetting.limit_amount}`)
    }

    const result = await CashAdvance.create({
      employeeId: req.body.employeeId,
      cash_advance_setting_id: req.body.cash_advance_setting_id,
      amount: req.body.amount,
      use_date: req.body.use_date,
      request_date: req.body.request_date,
      note: req.body.note,
      unique_id: req.userData.unique_id
    });

    const spv = await ReportTo.findAll({
      where: {
        employeeId: req.body.employeeId
      },
      attributes: ["id", "employeeId", "reportToEmployee"],
      raw: true,
      nest: true,
    });

    if (spv && spv.length > 0) {
      spv.map(async (sp) => {
        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: sp.reportToEmployee,
          employeeId: req.body.employeeId,
          title: "New Finance Cash Advance Request",
          link: "/inbox/approval-list",
          type: "approval"
        })
      })
    }

    return res.jsonSuccessCreated("Success create CashAdvance");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteCashAdvance = async (req, res) => {
  try {
    const result = await CashAdvance.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete CashAdvance");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateCashAdvance = async (req, res) => {
  try {
    const result = await CashAdvance.update(
      {
        employeeId: req.body.employeeId,
        cash_advance_setting_id: req.body.cash_advance_setting_id,
        amount: req.body.amount,
        use_date: req.body.use_date,
        request_date: req.body.request_date,
        note: req.body.note,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update CashAdvance");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllLoan = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    let result;
    let response = null;

    if (req.query.keyword) {
      result = await Loan.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: LoanSetting,
          as: "loan_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    } else if (req.query.date) {
      result = await Loan.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
          request_date: new Date(req.query.date)
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"],
          where: {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${req.query.keyword}%`
                }
              }
            ]
          }
        }, {
          model: LoanSetting,
          as: "loan_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    } else if (req.query.id) {
      result = await Loan.findByPk(req.query.id, {
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: LoanSetting,
          as: "loan_setting"
        }]
      })
    }
    else {
      result = await Loan.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
        },
        include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: LoanSetting,
          as: "loan_setting"
        }]
      });
      response = getPagingData(result, page, limit);
    }

    return res.jsonData(response != null ? response : result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addLoan = async (req, res) => {
  try {
    // const findSetting = await LoanSetting.findByPk(req.body.cash_advance_setting_id);

    // if (findSetting) {
    //   if (parseInt(req.body.amount) > parseInt(findSetting.limit_amount)) return res.errorBadRequest("Amount sudah mencapai batas limit!")
    // }

    const result = await Loan.create({
      employeeId: req.body.employeeId,
      loan_setting_id: req.body.loan_setting_id,
      amount: req.body.amount,
      interest: req.body.interest,
      note: req.body.note,
      max_installment: req.body.max_installment,
      request_date: req.body.request_date,
      use_date: req.body.use_date,
      unique_id: req.userData.unique_id,
    });

    const spv = await ReportTo.findAll({
      where: {
        employeeId: req.body.employeeId
      },
      attributes: ["id", "employeeId", "reportToEmployee"],
      raw: true,
      nest: true,
    });

    if (spv && spv.length > 0) {
      spv.map(async (sp) => {
        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: sp.reportToEmployee,
          employeeId: req.body.employeeId,
          title: "New Finance Loan Request",
          link: "/inbox/approval-list",
          type: "approval"
        })
      })
    }

    return res.jsonSuccessCreated("Success create Loan");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteLoan = async (req, res) => {
  try {
    const result = await Loan.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Loan");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateLoan = async (req, res) => {
  try {
    const result = await Loan.update(
      {
        employeeId: req.body.employeeId,
        loan_setting_id: req.body.loan_setting_id,
        amount: req.body.amount,
        interest: req.body.interest,
        note: req.body.note,
        max_installment: req.body.max_installment,
        status: req.body.status,
        request_date: req.body.request_date,
        use_date: req.body.use_date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Loan");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllLoanInstallment = async (req, res) => {
  try {
    const result = await LoanInstallment.findAll({
      where: {
        loan_id: req.params.loan_id,
      }
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addLoanInstallment = async (req, res) => {
  try {
    const result = await LoanInstallment.create({
      loan_id: req.body.loan_id,
      installment_to: req.body.installment_to,
      payment_nominal: req.body.payment_nominal,
      unique_id: req.userData.unique_id,
      payment_date: req.body.payment_date,
    });

    return res.jsonSuccessCreated("Success create LoanInstallment");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteLoanInstallment = async (req, res) => {
  try {
    const result = await LoanInstallment.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete LoanInstallment");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateLoanInstallment = async (req, res) => {
  try {
    const result = await LoanInstallment.update(
      {
        loan_id: req.body.loan_id,
        installment_to: req.body.installment_to,
        payment_nominal: req.body.payment_nominal,
        unique_id: req.userData.unique_id,
        payment_date: req.body.payment_date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update LoanInstallment");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllRBSetting,
  getSingleRBSetting,
  addRBSetting,
  updateRBSetting,
  deleteRBSetting,
  getAllCASetting,
  getSingleCASetting,
  addCASetting,
  updateCASetting,
  deleteCASetting,
  getAllLoanSetting,
  getSingleLoanSetting,
  addLoanSetting,
  updateLoanSetting,
  deleteLoanSetting,
  getAllReimbursement,
  addReimbursement,
  updateReimbursement,
  deleteReimbursement,
  getAllCashAdvance,
  addCashAdvance,
  updateCashAdvance,
  deleteCashAdvance,
  getAllLoan,
  addLoan,
  updateLoan,
  deleteLoan,
  getAllLoanInstallment,
  addLoanInstallment,
  deleteLoanInstallment,
  updateLoanInstallment
}