function joiResponse(joi, value) {
  var error = joi.error != null;
  var details = [];

  if (error) {
    joi.error.details.forEach((element) => {
      details.push({
        message: element.message.replace(/[^a-z0-9_\s]/gi, ""),
        key: element.context.key,
        value: element.context.value,
      });
    });
  }

  return {
    error: error,
    details: details,
  };
}

module.exports = {
  joiResponse,
};
