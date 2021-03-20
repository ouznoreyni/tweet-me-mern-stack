const Joi = require('joi')

const objectUserSchema = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(5).max(255).required(),
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
exports.validateUpdate = (data) => {
  const updateFieldSchema = {}
  for (const d in data) {
    updateFieldSchema[d] = objectUserSchema[d]
  }
  const schemaRegister = Joi.object(updateFieldSchema)
  return schemaRegister.validate(data)
}
