const Joi = require('joi')

const objectUserSchema = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().max(5).max(255).required(),
  repeat_password: Joi.ref('password'),
  birthday: Joi.number().integer().min(1900).max(2013),
}

exports.validateUser = async (data, isLoggin = false) => {
  if (isLoggin) {
    const { username, password } = objectUserSchema
    const schemaLoggin = Joi.object({ username, password })
    return schemaLoggin.validate(data)
  }

  const schemaRegister = Joi.object(objectUserSchema)
  return schemaRegister.validate(data)
}
