const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(10).max(13).required(),
    work: Joi.string().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    cpassword: Joi.ref("password"),
  })
    .with("password", "cpassword")
    .unknown();
    
    return schema.validate(data)
};

module.exports.registerValidation= registerValidation;