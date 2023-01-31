const PayrollComponent = require("../models/PayrollComponent.js");
const Employee = require("../models/Employee.js");
const EmployeeStatus = require("../models/Employeestatus.js");
const EmployeePayroll = require("../models/EmployeePayroll.js")
const PayrollBonus = require("../models/PayrollBonus.js");
const PayrollSettingComponent = require("../models/PayrollSettingComponent.js");
const PayrollSettingBpjs = require("../models/PayrollSettingBpjs.js");
const PayrollSettingPtkp = require("../models/PayrollSettingPtkp.js");
const PayrollSettingPkp = require("../models/PayrollSettingPkp.js");
const PayrollSettingThp = require("../models/PayrollSettingThp.js");
const PayrollHistory = require("../models/PayrollHistory.js");
const PayrollSettingThr = require("../models/PayrollSettingThr.js");
const {
  JobTitle,
  JobGrade,
  JobLevel,
  JobPosition,
} = require("../models/JobModels.js");
const { PayrollSettingUpUmpk, PayrollSettingUph } = require("../models/PayrollSettingEmployeeResign.js");

// pagination function
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? +(page - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: requests } = data;
  const currentPage = page ? +parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, requests, totalPages, currentPage };
};

// ================= PAYROLL COMPONENT CTRL =================
module.exports.getAllPayrollComponent = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const result = await PayrollComponent.findAndCountAll({
      raw: true,
      nest: true,
      limit,
      offset,
      where: {
        unique_id: req.userData.unique_id,
      },
      include: {
        model: Employee,
        include: [
          {
            model: EmployeeStatus,
          },
          {
            model: JobPosition
          },
          {
            model: EmployeePayroll
          }
        ]
      }
    });
    result.rows.map(res => {
      if (res.incomes != null) {
        res.incomes = JSON.parse(res.incomes)
        let totalIncome = 0;
        if (res.incomes) res.incomes.map((a) => totalIncome += a.value)
        res.totalIncome = totalIncome
      }
      if (res.deductions != null) {
        res.deductions = JSON.parse(res.deductions)
        let totalDeduction = 0;
        if (res.deductions) res.deductions.map((a) => totalDeduction += a.value)
        res.totalDeduction = totalDeduction
      }
      if (res.benefits != null) {
        res.benefits = JSON.parse(res.benefits)
        let totalBenefit = 0;
        if (res.benefits) res.benefits.map((a) => totalBenefit += a.value)
        res.totalBenefit = totalBenefit
      }
    })
    let response = getPagingData(result, page, limit)
    return res.jsonData(response);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports.importPC = async (req, res) => {
  try {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      const element = req.body[i];

      const findEmployee = await Employee.findOne({
        where: {
          firstName: element["Nama Karyawan"]
        },
        include: {
          model: EmployeePayroll
        },
        raw: true,
        nest: true
      });

      console.log(findEmployee.id);

      if (findEmployee) {
        await PayrollComponent.create({
          employeeId: findEmployee.id,
          unique_id: req.userData.unique_id,
          basic_salary: element["Basic Salary"],
          incomes: [
            {
              name: "Tunjangan Tetap",
              value: element["Tunjangan Tetap"]
            },
            {
              name: "Tunjangan Tidak Tetap",
              value: element["Tunjangan Tidak Tetap"]
            },
            {
              name: "Tunjangan Telekomunikasi",
              value: element["Tunjangan Telekomunikasi"]
            },
            {
              name: "Overtime",
              value: element["Overtime"]
            },
          ],
          deductions: [
            {
              name: "BPJS Kesehatan",
              value: element["BPJS Kesehatan"]
            },
            {
              name: "BPJS Ketenagakerjaan",
              value: element["BPJS Ketenagakerjaan"]
            },
            {
              name: "Late",
              value: element["Late"]
            },
            {
              name: "Izin Tak Bayar",
              value: element["Izin Tak Bayar"]
            },
          ],
          benefits: [
            {
              name: "Bonus",
              value: element["Bonus"]
            },
            {
              name: "Bonus CEO",
              value: element["Bonus CEO"]
            },
            {
              name: "Bonus Progress",
              value: element["Bonus Progress"]
            },
            {
              name: "Bonus Pulsa",
              value: element["Bonus Pulsa"]
            },
          ]
        })
      }

    }

    res.jsonSuccess("Success import payroll component!")
  } catch (error) {
    return res.serverError("Error " + error.toString())
  }
}

module.exports.addPayrollComponent = async (req, res) => {
  try {
    const result = await PayrollComponent.create({
      employeeId: req.body.employeeId,
      unique_id: req.userData.unique_id,
      basic_salary: req.body.basic_salary,
      incomes: req.body.incomes,
      deductions: req.body.deductions,
      benefits: req.body.benefits,
    });

    const findEmpPayroll = await EmployeePayroll.findOne({ where: { employeeId: req.body.employeeId } });

    if (findEmpPayroll) {
      await EmployeePayroll.update(
        {
          payroll_component_id: result.id
        },
        {
          where: {
            employeeId: req.body.employeeId
          }
        }
      )
    } else {
      await EmployeePayroll.create(
        {
          payroll_component_id: result.id
        },
      )
    }

    return res.jsonSuccessCreated("Success create PayrollComponent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports.deletePayrollComponent = async (req, res) => {
  try {
    const result = await PayrollComponent.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete PayrollComponent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports.updatePayrollComponent = async (req, res) => {
  try {
    const result = await PayrollComponent.update(
      {
        employeeId: req.body.employeeId,
        basic_salary: req.body.basic_salary,
        incomes: req.body.incomes,
        deductions: req.body.deductions,
        benefits: req.body.benefits,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const findEmpPayroll = await EmployeePayroll.findOne({ where: { employeeId: req.body.employeeId } });
    if (findEmpPayroll) {
      await EmployeePayroll.update(
        {
          payroll_component_id: result.id
        },
        {
          where: {
            employeeId: req.body.employeeId
          }
        }
      )
    } else {
      await EmployeePayroll.create(
        {
          payroll_component_id: result.id
        },
      )
    }

    return res.jsonSuccess("Success update PayrollComponent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

// ================= PAYROLL BONUS CTRL =================
module.exports.addBonus = async (req, res) => {
  try {
    let delegated_to;
    if (req.body.delegated_to != null) {
      delegated_to = req.body.delegated_to;
    } else {
      delegated_to = null;
    }
    await PayrollBonus.create({
      name: req.body.name,
      amount: req.body.amount,
      status: req.body.status,
      unique_id: req.userData.unique_id,
      delegated_to: delegated_to,
    });

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send({
      message: `Error => ${error}`
    });
  }
}

module.exports.updateBonus = async (req, res) => {
  let delegated_to;
  try {
    if (req.body.delegated_to != null) {
      delegated_to = req.body.delegated_to;
    } else {
      delegated_to = null;
    }
    await PayrollBonus.update({
      name: req.body.name,
      amount: req.body.amount,
      status: req.body.status,
      delegated_to: delegated_to,
    }, {
      where: {
        id: req.body.id,
      },
    });

    return res.status(200).send({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send({
      message: `Error => ${error}`
    });
  }
}

module.exports.getDetailBonus = async (req, res) => {
  try {
    var bonus = await PayrollBonus.findOne({
      where: {
        id: req.query.id,
      },
      raw: true,
      nest: true,
    });

    if (bonus) {
      if (bonus.status == "employees") {
        let ids = JSON.parse(bonus.delegated_to);
        bonus.delegated_to = await Employee.findAll({
          attributes: ['id', 'firstName'],
          where: {
            id: ids,
          }
        });
      } else if (bonus.status == "specific") {
        let fromJson = JSON.parse(bonus.delegated_to);
        for (var i = 0; i < fromJson.length; i++) {
          var rows = fromJson[i];
          var ids = rows.data;
          if (rows.name == "Job Grade") {
            rows.data = await JobGrade.findAll({
              attributes: ['id', 'name'],
              where: {
                id: ids,
              }
            });
          } else if (rows.name == "Job Level") {
            rows.data = await JobLevel.findAll({
              attributes: ['id', 'name'],
              where: {
                id: ids,
              }
            });
          } else if (rows.name == "Job Title") {
            rows.data = await JobTitle.findAll({
              attributes: ['id', 'name'],
              where: {
                id: ids,
              }
            });
          } else if (rows.name == "Job Position") {
            rows.data = await JobPosition.findAll({
              attributes: ['id', 'name'],
              where: {
                id: ids,
              }
            });
          }
        }
        bonus.delegated_to = fromJson;
      }
    }

    res.status(200).send({
      message: "Success",
      data: bonus,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: `Error => ${error}`
    });
  }
}

module.exports.deleteBonus = async (req, res) => {
  try {
    await PayrollBonus.destroy({
      where: {
        id: req.query.id
      },
    });

    return res.status(200).send({
      message: "Success"
    });
  } catch (error) {
    res.status(400).send({
      message: `Error => ${error}`
    });
  }
}

module.exports.getBonus = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    var data = await PayrollBonus.findAndCountAll({
      raw: true,
      nest: true,
      offset,
      limit,
      where: {
        unique_id: req.userData.unique_id,
        unique_id: null,
      }
    });
    for (var i = 0; i < data.rows.length; i++) {
      let rows = data?.rows[i];
      var delegated_to;
      if (rows.status != "all") {
        let fromJson = JSON.parse(rows?.delegated_to);
        console.log(fromJson);
        if (rows.status == "employees") {
          delegated_to = `${fromJson.length} Employees`;
        } else {
          delegated_to = `${fromJson.length} Position`;
        }
      } else {
        delegated_to = "All Position";
      }
      rows.delegated_to = delegated_to;
    }
    let response = getPagingData(data, page, limit);
    res.status(200).send({
      message: 'Success',
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      message: `Error => ${error}`
    });
  }
}

// ================= PAYROLL SETTING COMPONENT =================
module.exports.getSettingComponent = async (req, res) => {
  try {
    const data = await PayrollSettingComponent.findAll({
      where: {
        unique_id: req.userData.unique_id,
      }
    })

    if (data) {
      data.map(data => {
        if (data.delegated_to != null && data.delegated_to) {
          data.delegated_to = JSON.parse(data.delegated_to)
        }
      })
    }

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.getSingleSettingComponent = async (req, res) => {
  try {
    const data = await PayrollSettingComponent.findOne({
      where: {
        id: req.params.id,
      }
    })

    if (data) {
      if (data.delegated_to != null && data.delegated_to) {
        data.delegated_to = JSON.parse(data.delegated_to)
      }
    }

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.addSettingComponent = async (req, res) => {
  try {
    await PayrollSettingComponent.create({
      name: req.body.name,
      amount: req.body.amount,
      payment_period: req.body.payment_period,
      tax: req.body.tax,
      payment_date: req.body.payment_date,
      delegated_to: req.body.delegated_to,
      type: req.body.type,
      sub_type: req.body.sub_type,
      unique_id: req.userData.unique_id,
    })

    res.jsonSuccessCreated("Success create data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updateSettingComponent = async (req, res) => {
  try {
    await PayrollSettingComponent.update({
      name: req.body.name,
      amount: req.body.amount,
      payment_period: req.body.payment_period,
      tax: req.body.tax,
      payment_date: req.body.payment_date,
      delegated_to: req.body.delegated_to,
      type: req.body.type,
      sub_type: req.body.sub_type,
    }, { where: { id: req.params.id } })

    res.jsonSuccess("Success update data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.deleteSettingComponent = async (req, res) => {
  try {
    await PayrollSettingComponent.destroy({
      where: { id: req.params.id }
    })

    res.jsonSuccess("Success delete data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING BPJS KK =================
module.exports.getSettingBpjs = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const data = await PayrollSettingBpjs.findAndCountAll({
      where: {
        unique_id: req.userData.unique_id,
      },
      offset: offset,
      limit: limit,
      raw: true,
      nest: true,
    })

    let response = getPagingData(data, page, limit);

    res.jsonData(response)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.getSingleSettingBpjs = async (req, res) => {
  try {
    const data = await PayrollSettingBpjs.findOne({
      where: {
        id: req.params.id,
      }
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.addSettingBpjs = async (req, res) => {
  try {
    await PayrollSettingBpjs.create({
      npp_name: req.body.npp_name,
      npp_number: req.body.npp_number,
      branch: req.body.branch,
      jkk: req.body.jkk,
      unique_id: req.userData.unique_id,
    })

    res.jsonSuccessCreated("Success create data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updateSettingBpjs = async (req, res) => {
  try {
    await PayrollSettingBpjs.update({
      npp_name: req.body.npp_name,
      npp_number: req.body.npp_number,
      branch: req.body.branch,
      jkk: req.body.jkk,
    }, { where: { id: req.params.id } })

    res.jsonSuccess("Success update data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.deleteSettingBpjs = async (req, res) => {
  try {
    await PayrollSettingBpjs.destroy({
      where: { id: req.params.id }
    })

    res.jsonSuccess("Success delete data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING PTKP CTRL =================

module.exports.getSingleSettingPtkp = async (req, res) => {
  try {
    const data = await PayrollSettingPtkp.findOne({
      where: {
        unique_id: req.userData.unique_id,
      }
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.setPtkp = async (req, res) => {
  try {
    const find = await PayrollSettingPtkp.findOne({
      where: { unique_id: req.userData.unique_id }
    })

    if (find) {
      await PayrollSettingPtkp.update({
        individual_taxpayer: req.body.individual_taxpayer,
        additional_individual_taxpayer: req.body.additional_individual_taxpayer,
        additional_married_taxpayers: req.body.additional_married_taxpayers,
        additional_dependents: req.body.additional_dependents,
      }, { where: { unique_id: req.userData.unique_id } })
    } else {
      await PayrollSettingPtkp.create({
        unique_id: req.userData.unique_id,
        individual_taxpayer: req.body.individual_taxpayer,
        additional_individual_taxpayer: req.body.additional_individual_taxpayer,
        additional_married_taxpayers: req.body.additional_married_taxpayers,
        additional_dependents: req.body.additional_dependents,
      })
    }

    res.jsonSuccessCreated("Success set ptkp")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING PKP KK =================
module.exports.getSettingPkp = async (req, res) => {
  try {
    const data = await PayrollSettingPkp.findAll({
      where: {
        unique_id: req.userData.unique_id,
      },
      raw: true,
      nest: true,
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.addSettingPkp = async (req, res) => {
  try {
    await PayrollSettingPkp.create({
      income_from: req.body.income_from,
      income_to: req.body.income_to,
      rate: req.body.rate,
      unique_id: req.userData.unique_id,
    })

    res.jsonSuccessCreated("Success create data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updateSettingPkp = async (req, res) => {
  try {
    await PayrollSettingPkp.update({
      income_from: req.body.income_from,
      income_to: req.body.income_to,
      rate: req.body.rate,
    }, { where: { id: req.params.id } })

    res.jsonSuccess("Success update data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.deleteSettingPkp = async (req, res) => {
  try {
    await PayrollSettingPkp.destroy({
      where: { id: req.params.id }
    })

    res.jsonSuccess("Success delete data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING TAKE HOME PAY CTRL =================

module.exports.getSingleSettingThp = async (req, res) => {
  try {
    const data = await PayrollSettingThp.findOne({
      where: {
        unique_id: req.userData.unique_id,
      }
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.setThp = async (req, res) => {
  try {
    const find = await PayrollSettingThp.findOne({
      where: { unique_id: req.userData.unique_id }
    })

    if (find) {
      await PayrollSettingThp.update({
        prorate_type: req.body.prorate_type,
        number: req.body.number,
        is_count_national_holiday: req.body.is_count_national_holiday,
        salary_tax_setting: req.body.salary_tax_setting,
      }, { where: { unique_id: req.userData.unique_id } })
    } else {
      await PayrollSettingThp.create({
        unique_id: req.userData.unique_id,
        prorate_type: req.body.prorate_type,
        number: req.body.number,
        is_count_national_holiday: req.body.is_count_national_holiday,
        salary_tax_setting: req.body.salary_tax_setting,
      })
    }

    res.jsonSuccessCreated("Success set Thp")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING THR CTRL =================

module.exports.getSingleSettingThr = async (req, res) => {
  try {
    const data = await PayrollSettingThr.findOne({
      where: {
        unique_id: req.userData.unique_id,
      }
    })

    if (data) {
      if (data.data != null) {
        data.data = JSON.parse(data.data)
      }
    }

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.setThr = async (req, res) => {
  try {
    const find = await PayrollSettingThr.findOne({
      where: { unique_id: req.userData.unique_id }
    })
    // req.body.data = JSON.parse(req.body.data)`

    if (find) {
      await PayrollSettingThr.update({
        prorate: req.body.prorate,
        new_employee_month: req.body.new_employee_month,
        thr_component: req.body.thr_component,
        data: req.body.data,
      }, { where: { unique_id: req.userData.unique_id } })
    } else {
      await PayrollSettingThr.create({
        unique_id: req.userData.unique_id,
        prorate: req.body.prorate,
        new_employee_month: req.body.new_employee_month,
        thr_component: req.body.thr_component,
        data: req.body.data,
      })
    }

    res.jsonSuccessCreated("Success set Thr")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL HISTORY CTRL =================

module.exports.getPayrollHistory = async (req, res) => {
  try {
    const data = await PayrollHistory.findAll({
      where: {
        unique_id: req.userData.unique_id,
      }
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.setThr = async (req, res) => {
  try {
    const find = await PayrollHistory.findOne({
      where: { unique_id: req.userData.unique_id }
    })
    // req.body.data = JSON.parse(req.body.data)`

    if (find) {
      await PayrollHistory.update({
        prorate: req.body.prorate,
        new_employee_month: req.body.new_employee_month,
        thr_component: req.body.thr_component,
        data: req.body.data,
      }, { where: { unique_id: req.userData.unique_id } })
    } else {
      await PayrollHistory.create({
        unique_id: req.userData.unique_id,
        prorate: req.body.prorate,
        new_employee_month: req.body.new_employee_month,
        thr_component: req.body.thr_component,
        data: req.body.data,
      })
    }

    res.jsonSuccessCreated("Success set Thr")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}
// ================= PAYROLL SETTING EMPLOYEE RESIGN =================

// ================= PAYROLL SETTING UPH =================
module.exports.getSettingUph = async (req, res) => {
  try {
    const data = await PayrollSettingUph.findAll({
      where: {
        unique_id: req.userData.unique_id,
      },
      raw: true,
      nest: true,
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.addSettingUph = async (req, res) => {
  try {
    await PayrollSettingUph.create({
      name: req.body.name,
      amount: req.body.amount,
      unique_id: req.userData.unique_id,
    })

    res.jsonSuccessCreated("Success create data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updateSettingUph = async (req, res) => {
  try {
    await PayrollSettingUph.update({
      name: req.body.name,
      amount: req.body.amount,
    }, { where: { id: req.params.id } })

    res.jsonSuccess("Success update data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.deleteSettingUph = async (req, res) => {
  try {
    await PayrollSettingUph.destroy({
      where: { id: req.params.id }
    })

    res.jsonSuccess("Success delete data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

// ================= PAYROLL SETTING UP / UMPK =================
module.exports.getSettingUpUmpk = async (req, res) => {
  try {
    const data = await PayrollSettingUpUmpk.findAll({
      where: {
        unique_id: req.userData.unique_id,
      },
      raw: true,
      nest: true,
    })

    res.jsonData(data)
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.addSettingUpUmpk = async (req, res) => {
  try {
    await PayrollSettingUpUmpk.create({
      operator: req.body.type == "up" ? req.body.operator : 'null',
      tahun: req.body.tahun,
      gaji_bulanan: req.body.gaji_bulanan,
      type: req.body.type,
      unique_id: req.userData.unique_id,
    })

    res.jsonSuccessCreated("Success create data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updateSettingUpUmpk = async (req, res) => {
  try {
    await PayrollSettingUpUmpk.update({
      operator: req.body.type == "up" ? req.body.operator : 'null',
      tahun: req.body.tahun,
      gaji_bulanan: req.body.gaji_bulanan,
      type: req.body.type,
    }, { where: { id: req.params.id } })

    res.jsonSuccess("Success update data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.deleteSettingUpUmpk = async (req, res) => {
  try {
    await PayrollSettingUpUmpk.destroy({
      where: { id: req.params.id }
    })

    res.jsonSuccess("Success delete data")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}