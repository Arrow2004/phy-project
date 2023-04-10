const Article = require("../models/articleModel");
const User = require("../models/userModel");
//gets
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", ["firstName", "lastName", "username"])
      .lean();
    res.render("articles/articles", {
      title: "Barcha maqolalar",
      articles: articles.reverse(),
      user: req.session.user,
      isLogged: req.session.isLogged,
      regUser: req.session.user,
    });
  } catch (e) {}
};
const addArticlePage = async (req, res) => {
  try {
    res.render("articles/addArticle", {
      title: "Yangi maqola qo'shish",
      regUser: req.session.user,
    });
  } catch (e) {
    console.log(e);
  }
};

const getOneArticlePage = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { visits: 1 } },
      { new: true }
    )
      .populate("author", ["firstName", "lastName", "username"])
      .lean();
    res.render("articles/article", {
      title: article.title,
      article,
      user: req.session.user,
      isLogged: req.session.isLogged,
      regUser: req.session.user,
    });
  } catch (e) {
    console.log(e);
  }
};
//Posts
const addArticle = async (req, res) => {
  try {
    const { title, body, preview, previewPicture } = req.body;
    const newArticle = await Article.create({
      title,
      body,
      preview,
      previewPicture: req.file.filename,
      author: req.session.user._id,
    });
    await User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { articles: newArticle._id } },
      { new: true, upsert: true }
    );
    res.redirect("/article/" + newArticle._id);
  } catch (error) {
    console.log(error);
  }
};
const removeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (req.params.id == article._id) {
      await Article.findByIdAndDelete(req.params.id);
      res.redirect("/article");
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  addArticle,
  getOneArticlePage,
  addArticlePage,
  getAllArticles,
  removeArticle,
};
