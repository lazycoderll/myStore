const express = require('express');
const router = express.Router();
const { createUser, userLogin, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser } = require('../controller/userctrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')


router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/allusers', getallUser)
router.get('/:id', authMiddleware, getaUser)
router.delete('/:id', deleteaUser)
router.put('/edit-user', authMiddleware, updatedUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser,)
router.put('/unblock-user/:id', authMiddleware, isAdmin,unblockUser,)



module.exports = router;