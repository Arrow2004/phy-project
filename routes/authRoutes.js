const { Router } = require("express");
const router = Router();
const {
  getRegisterPage,
  getLoginPage,
  getUpdatePage,
  login,
  signup,
  logout,
  update
} = require("../controllers/authControllers");
const {guest,protected}  =require('../midllewares/auth')
const upload = require("../utils/upload");
router.get("/login", guest,getLoginPage);
router.get("/signup",guest, getRegisterPage);
router.get("/update", protected,getUpdatePage);
router.get("/logout",protected, logout);
router.post("/login",guest, login);
router.post("/signup",guest, upload.single("profilePicture"), signup);
router.post("/update", protected,upload.single("profilePicture"),update);


module.exports = router;
