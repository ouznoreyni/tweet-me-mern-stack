const Joi = require('joi')
const _ = require('lodash')

const objectUserSchema = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(5).max(255).required(),
  repeat_password: Joi.ref('password'),
  birthday: Joi.number().integer().min(1900).max(2013),
}
const profilSchema = {
  avatar: Joi.string(),
  bio: Joi.string().min(10),
  localisation: Joi.string().min(3),
  website: Joi.string().uri().min(5),
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
  let updateFieldSchema = {}
  if (data['profil']) {
    const { profil } = data
    updateFieldSchema['profil'] = Joi.object().keys(
      _.pick(profilSchema, Object.keys(profil))
    )
  }

  const updateFiledPicked = _.pick(objectUserSchema, Object.keys(data))

  updateFieldSchema = { ...updateFieldSchema, ...updateFiledPicked }
  const schemaRegister = Joi.object(updateFieldSchema)
  return schemaRegister.validate(data)
}
