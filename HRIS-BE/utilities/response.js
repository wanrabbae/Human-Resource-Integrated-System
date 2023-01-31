module.exports = function (req, res, next) {
  req.fullhost = `${req.protocol}://${req.headers.host}`;

  res.jsonData = (data) => {
    return res.status(200).send({ data: data });
  };

  res.jsonSuccess = (msg = "Action Success") => {
    return res.status(200).send({ message: msg });
  };

  res.jsonSuccessCreated = (msg = "Action Success") => {
    return res.status(201).send({ message: msg });
  };

  res.errorBadRequest = (msg = "Bad Request") => {
    return res.status(400).send({ message: msg });
  };

  res.errorValidation = (data) => {
    return res.status(400).send({ data: data });
  };

  res.errorUnauthorized = (msg = "Token is Invalid") => {
    return res.status(401).send({ message: msg });
  };

  res.errorForbidden = (msg = "Access Forbidden") => {
    return res.status(403).send({ message: msg });
  };

  res.errorNotFound = (msg = "Data Not Found") => {
    return res.status(404).send({ message: msg });
  };

  res.serverError = (msg = "Data Not Found") => {
    return res.status(500).send({ message: msg });
  };

  next();
};
