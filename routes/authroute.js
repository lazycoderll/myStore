const express = require('express');
const router = express.Router();
const { createUser, userLogin, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefreshToken, logout } = require('../controller/userctrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')


router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/allusers', getallUser)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.put('/edit-user', authMiddleware, updatedUser)
router.get('/:id', authMiddleware, getaUser)
router.delete('/:id', deleteaUser)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser,)
router.put('/unblock-user/:id', authMiddleware, isAdmin,unblockUser,)


module.exports = router;