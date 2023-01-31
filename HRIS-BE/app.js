require("dotenv").config();
var express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
var app = express();
const response = require("./utilities/response");
const router = require("./routes/route.js");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const subsdiaryRoutes = require("./routes/subsdiary.routes");
const packageRoutes = require("./routes/package.routes");
const transactionRoutes = require("./routes/transaction.routes");
const financeRoutes = require("./routes/finance.routes");
const couponRoutes = require("./routes/coupon.routes");
const respondentRoutes = require("./routes/respondent.routes");
const leaveRoutes = require("./routes/leave.routes");
const forumsRoutes = require("./routes/forums.routes");
const payrollRoutes = require("./routes/payroll.routes");
const approvalRoutes = require("./routes/approval.routes");
const inboxRoutes = require("./routes/inbox.routes");
const permissionsRoutes = require("./routes/permissions.routes");
const overtimeRoutes = require("./routes/overtime.routes");
const newsRoutes = require("./routes/news.routes");
const homemobileRoutes = require("./routes/homemobile.routes");
const db = require("./config/database.js");
const bodyParser = require("body-parser");
const cors = require("cors");
// Routes
// app.use(
//   helmet({
//     frameguard: {
//       action: "deny",
//     },
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["style.com"],
//       },
//     },
//     dnsPrefetchControl: false,
//   })
// );
// app.use(morgan());
app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use(response);

app.use(
  router,
  adminRoutes,
  packageRoutes,
  couponRoutes,
  transactionRoutes,
  leaveRoutes,
  respondentRoutes,
  userRoutes,
  roleRoutes,
  subsdiaryRoutes,
  financeRoutes,
  forumsRoutes,
  payrollRoutes,
  approvalRoutes,
  inboxRoutes,
  permissionsRoutes,
  overtimeRoutes,
  newsRoutes,
  homemobileRoutes
);

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// Listen
var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on localhost:" + port);

module.exports = app;