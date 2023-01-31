const News = require("../models/News.js");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../config/database.js");

// GET
const getNews = async (req, res) => {
  try {
    const result = await News.findAll({
      limit: req.query.limit ? parseInt(req.query.limit) : null,
      where: {
        unique_id: req.userData.unique_id,
      }
    });
    result.map(res => {
      if (res.image != null) {
        res.image = `${req.protocol}://${req.get('host')}/assets/news/${res.image}`
      } else {
        res.image = null
      }
    })
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getSingleNews = async (req, res) => {
  try {
    const result = await News.findOne({
      where: {
        id: req.params.id,
      }
    });
    if (result) {
      if (result.image != null) {
        result.image = `${req.protocol}://${req.get('host')}/assets/news/${result.image}`
      } else {
        result.image = null
      }
    }
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

// ADD
const addNews = async (req, res) => {
  try {
    let file = null;

    if (req.file) {
      const tempPath = req.file.path;
      file = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/news/${file}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const result = await News.create({
      image: file,
      title: req.body.title,
      desc: req.body.desc,
      unique_id: req.userData.unique_id
    });
    return res.jsonSuccessCreated("Success Create News");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

// DELETE
const deleteNews = async (req, res) => {
  try {
    const result = await News.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success Delete News");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

//  UPDATE
const updateNews = async (req, res) => {
  try {
    const findData = await News.findByPk(req.params.id)
    let file = findData.image;

    if (req.file) {
      fs.unlink(`assets/news/${findData.image}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      const tempPath = req.file.path;
      file = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/news/${file}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const result = await News.update(
      {
        image: file,
        title: req.body.title,
        desc: req.body.desc,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success Update News");

  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
}

module.exports = {
  getNews,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
}