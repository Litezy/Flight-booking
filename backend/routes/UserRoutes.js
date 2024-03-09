const {CreateUser, GetAllUsers, UpdateUser} = require('../controllers/UserControllers')

const router = require('express').Router();
router.post('/create', CreateUser)
router.get('/all', GetAllUsers)
router.post('/update/:id', UpdateUser)
module.exports = router;