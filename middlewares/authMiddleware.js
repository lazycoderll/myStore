const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.header.authorization.split(" ")[1];
    try {
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
        }
    } catch {
        throw new Error('token expired, please login')
    }
  } else {
    throw new Error("no token attached");
  }
});


module.exports = {authMiddleware}