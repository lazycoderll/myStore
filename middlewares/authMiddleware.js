const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded?.id);
            req.user = user;
            next();
        }
    } catch {
        throw new Error('token expired, please login')
    }
  } else {
    throw new Error("no token attached");
  }
});

const isAdmin = asyncHandler (async (req, res) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== 'admin'){
      throw new Error('you are not an admin')
    } else {
      next();
    }
})

module.exports = {authMiddleware,  isAdmin}