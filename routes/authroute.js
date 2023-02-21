const express = require('express');
const router = express.Router();
const { createUser, userLogin, getallUser, getaUser } = require('../controller/userctrl');



router.post('/register', createUser)
router.post('/login', userLogin)
router.get('/allusers', getallUser)
router.get('/:id', getaUser)



module.exports = router;