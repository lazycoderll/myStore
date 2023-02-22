const User = require('../models/usermodel')
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwt');

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
          token: generateToken(findUser?._id)
        })
    }else {
        throw new Error('invalid credentials')
    }
})

//update a user
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
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
      try {
          const deleteaUser = await User.findByIdAndDelete(id);
          res.json({
              deleteaUser,
          })
      } catch (error) {
          throw new Error(error)
      }
  }) 

  
module.exports = {createUser, userLogin, getallUser, getaUser, deleteaUser, updateUser}