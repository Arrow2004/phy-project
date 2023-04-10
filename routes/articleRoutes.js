const {Router} = require('express')
const router = Router()
const {getOneArticlePage,removeArticle,getAllArticles,addArticle,addArticlePage}= require('../controllers/articleControlers')
const upload = require('../utils/upload')
const {protected} = require('../midllewares/auth')
router.get('/',getAllArticles)
router.get('/remove/:id',protected,removeArticle)
router.get('/addArticle',protected,addArticlePage)
router.get('/:id',getOneArticlePage)
router.post('/addArticle',protected,upload.single('previewPicture'),addArticle)

module.exports = router;