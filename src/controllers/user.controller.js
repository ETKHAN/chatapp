import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";


const createUser = asyncHandler(async (req, res) => {

  const {username, email, password} = req.body;


  if(!(username && email && (password?.length > 6))) throw new ApiError(400, "Invalid credentials");

  const userExists = await User.findOne({
    $or : [ {username}, {email} ]
  })

  if(userExists) throw new ApiError(400, "User already exists");


  const user = await User.create({
    username : username.toLowerCase(), 
    email, 
    password});

  const createdUser = await User.findById(user._id).select(
  "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "failed to register user successfully!");


  res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully!")

  );

});



export {
  createUser
}