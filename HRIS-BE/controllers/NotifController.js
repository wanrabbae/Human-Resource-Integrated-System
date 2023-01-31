const Notification = require("../models/Notification.js");

module.exports.pushNotif = async (req, res) => {
  try {
    const notif = await Notification.create({
      title: req.body.title,
      link: req.body.link,
      applicant_id: req.body.applicant_id,
      employeeId: req.body.employeeId,
      unique_id: req.userData.unique_id,
    });

    res.status(201).json({
      success: 201,
      message: "success push notification",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};
