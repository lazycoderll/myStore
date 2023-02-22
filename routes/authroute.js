const express = require('express');
const router = express.Router();
const { createUser, userLogin, getallUser, getaUser, deleteaUser, updateUser } = require('../controller/userctrl');
const {authMiddleware} = require('../middlewares/authMiddleware')


router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/allusers', getallUser)
router.get('/:id', authMiddleware, getaUser)
router.delete('/:id', deleteaUser)
router.put('/:id', updateUser)




module.exports = router;