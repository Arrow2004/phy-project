const {Router} = require('express')
const router = Router()
const {getProfilePage,getUsersPage} = require('../controllers/profileControllers')
router.get('/users',getUsersPage)
router.get('/:username',getProfilePage)

module.exports = router;