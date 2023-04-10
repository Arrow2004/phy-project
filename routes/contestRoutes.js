const { Router } = require("express");
const router = Router();
const {getAllContests,addContest,addContestPage,addQuestions,addQuestionsPage,oneContest,checkContest} = require('../controllers/contestControllers');
const {protected} = require('../midllewares/auth')
const upload = require('../utils/upload')
router.get('/',getAllContests)
router.get('/add/:id',protected,addQuestionsPage)
router.get('/add',protected,addContestPage)
router.get('/start/:id',protected,oneContest)
router.post('/add',protected,upload.single('previewPicture'),addContest)
router.post('/add/:id',protected,addQuestions)
router.post('/check/:cId/:uId',protected,checkContest)
module.exports = router