const Animation = require("../models/animationModel");
const uploadImage = require("../utils/cloudinary");
const cloudinary = require("cloudinary");
const getHomePage = async (req, res) => {
  const animations = await Animation.find().lean();
  res.render("animations/home", {
    title: "Animatsiya va virtual labaratoriyalar",
    regUser: req.session.user,
    animations,
  });
};
const getOnePage = async (req, res) => {
  try {
    const animation = await Animation.findById(req.params.id).lean();
    res.render("animations/one", {
      title: animation.title,
      regUser: req.session.user,
      animation,
    });
  } catch (e) {
    console.log(e);
  }
};
const getAddPage = (req, res) => {
  res.render("animations/add", {
    title: "Yangi animatsiya qo'shish",
    regUser: req.session.user,
  });
};
const Add = async (req, res) => {
  try {
    const uploadPic = await uploadImage(req.file);
    const { title, body, preview, ref } = req.body;
    const newAnim = await Animation.create({
      title,
      ref,
      preview,
      previewPicture: uploadPic,
      body,
    });
    console.log(newAnim);
    if (newAnim) {
      res.redirect("/animations/");
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { getHomePage, getOnePage, getAddPage, Add };
