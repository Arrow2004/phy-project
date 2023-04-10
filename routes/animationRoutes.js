const {Router} = require('express')
const router = Router()
const {protected} = require('../midllewares/auth')
const {getHomePage,getOnePage} = require('../controllers/animationControllers')
router.get('/',getHomePage)
router.get('/:id',getOnePage)
module.exports = router;