const Joi = require("joi");

const { joiResponse } = require("../utilities/validation");

const create = (req) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    username: Joi.string().required().label("username"),
    email: Joi.string().min(6).email().required().label("email"),
    password: Joi.string().min(6).required().label("password"),
    password_confirm: Joi.ref("password"),
    employee_id: Joi.number().required().label("employee_id"),
    role_id: Joi.number().required().label("role_id"),
    location: Joi.string().required().label("location"),
  });

  return joiResponse(schema.validate(req.body));
};

module.exports = {
  create,
};
