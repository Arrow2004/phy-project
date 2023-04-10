const { Router } = require("express");
const router = Router();
const {
  getRegisterPage,
  getLoginPage,
  login,
  signup,
  logout,
} = require("../controllers/authControllers");
const {guest,protected}  =require('../midllewares/auth')
const upload = require("../utils/upload");
router.get("/login", guest,getLoginPage);
router.get("/signup",guest, getRegisterPage);
router.get("/logout",protected, logout);
router.post("/login",guest, login);
router.post("/signup",guest, upload.single("profilePicture"), signup);
module.exports = router;
