const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/userctrl');



router.post('/register', createUser)

module.exports = router;