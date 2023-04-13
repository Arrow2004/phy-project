const { Contest, Questions } = require("../models/contestModel");
const User = require("../models/userModel");
const uploadImage = require('../utils/cloudinary')
const cloudinary = require('cloudinary')
const getAllContests = async (req, res) => {
  try {
    const contests = await Contest.find().populate("authors").lean();
    res.render("contests/home", {
      title: "Contest va testlar",
      regUser: req.session.user,
      contests,
    });
  } catch (e) {
    console.log(e);
  }
};
const addContest = async (req, res) => {
  try {
    const uploadPic = await uploadImage(req.file)
    const contest = await Contest.create({
      title: req.body.title,
      description: req.body.description,
      authors: [req.session.user._id],
      previewPicture: req.file.filename,
    });
    res.redirect("/contest/add/" + contest._id);
  } catch (e) {
    console.log(e);
  }
};
const addQuestionsPage = async (req, res) => {
  try {
    res.render("contests/questions", {
      title: "Yangi test " + req.params.id,
      id: req.params.id,
      regUser: req.session.user,
    });
  } catch (e) {
    console.log(e);
  }
};
const addQuestions = async (req, res) => {
  try {
    const question = await Questions.create({
      question: req.body.question,
      answers: req.body.answers,
      correctAnswer: req.body.answers[0],
    });
    await Contest.findByIdAndUpdate(
      req.params.id,
      { $push: { questions: question._id } },
      { new: true, upsert: true }
    );
    res.redirect(req.get("referer"));
  } catch (e) {
    console.log(e);
  }
};
const addContestPage = (req, res) => {
  res.render("contests/add", {
    title: "Contest qo'shish",
    regUser: req.session.user,
  });
};
const oneContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate("authors", ["firstName", "lastName", "userName"])
      .populate("questions")
      .lean();
    function random_sort(a, b) {
      return Math.random() - 0.5;
    }
    contest.questions.forEach((e) => e.answers.sort(random_sort));
    res.render("contests/one", {
      title: contest.title,
      contest: contest,
      regUser: req.session.user,
    });
  } catch (e) {
    console.log(e);
  }
};
const checkContest = async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.cId)
      .populate("questions", ["question", "correctAnswer"])
      .populate("participants.user")
      .lean();
    let score = 0;
    const questions = req.body;
    for (e of contest.questions) {
      if (
        questions[e.question] != null &&
        questions[e.question] === e.correctAnswer
      ) {
        score++;
      }
    }

    if (
      contest.participants.every(function (user) {
        return user.user.username != req.session.user.username;
      })
    ) {
      await Contest.findByIdAndUpdate(
        req.params.cId,
        {
          $push: {
            participants: {
              user: req.params.uId,
              score: score,
            },
          },
        },
        { new: true, upsert: true }
      );
    }

    res.render("contests/results", {
      title: `Test natijalari`,
      contest,
      score,
      results: contest.participants.sort(function(a,b){return  b.score-a.score}),
      regUser: req.session.user,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getAllContests,
  addContest,
  addContestPage,
  addQuestions,
  addQuestionsPage,
  oneContest,
  checkContest,
};
