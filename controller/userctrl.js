const User = require('../models/usermodel')
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwt');
const validateMongodbId = require('../utils/validatemongodbid')
const createUser = asyncHandler( async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email});
    if(!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
      throw new Error('user already exists')
    }
})

//login a user
const userLogin = asyncHandler (async (req, res) => {
    const {email, password} = req.body
    //check if user exists
    const findUser = await  User.findOne({email})
    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
          _id: findUser?._id,
          firstname: findUser?.firstname,
          lastname:  findUser?.lastname,
          email: findUser?.email,
          mobile:  findUser?.mobile,
          token: generateToken(findUser?._id),
          role: findUser?.role
        })
    }else {
        throw new Error('invalid credentials')
    }
})

//update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongodbId(id)
    try {
        const updatedUser = await User.findByIdAndUpdate (
            id,
            {
                firstname: req?.body.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser)
    } catch (error) {
        throw new Error(error)
    }
})

//get all user
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

//get a single user
const getaUser = asyncHandler ( async (req, res) => {
  const  { id } = req.params;
  validateMongodbId(id)
    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
}) 

//delete a user
const deleteaUser = asyncHandler ( async (req, res) => {
    const  { id } = req.params;
    validateMongodbId(id)
      try {
          const deleteaUser = await User.findByIdAndDelete(id);
          res.json({
              message: "user deleted"
          })
      } catch (error) {
          throw new Error(error)
      }
  });

  // admin to block a user
const blockUser = asyncHandler (async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "user blocked",
        })
    } catch (error) {
        throw new Error(error)
    }
})

//admin to unblock a user
const unblockUser = asyncHandler (async (req, res ) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true
            }
        )
        res.json({
            message: 'user unblocked'
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createUser, userLogin, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser}