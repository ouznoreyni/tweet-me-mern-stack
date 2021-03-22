const mongoose = require('mongoose')

const scheama = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
      trim: true,
      maxlength: 280,
    },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Tweet = mongoose.model('Tweets', scheama)
export default Tweet
