const { Schema, model } = require("mongoose");
const contestModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  previewPicture: {
    type: String,
    required: true
  },
  participants: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      score: {
        type: Number,
        required: true
      }
    }
  ]
},{
  timestamps: true,
});
const questionModel = new Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [{
   type: String
  }],
  correctAnswer: {
    type: String
  }
});
const Contest = model("Contest", contestModel);
const Questions = model("Questions", questionModel);
module.exports = {
  Contest,
  Questions,
};
