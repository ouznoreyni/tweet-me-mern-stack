const Joi = require('joi')

exports.validateTweet = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(280).required(),
  })
  return schema.validate(data)
}
