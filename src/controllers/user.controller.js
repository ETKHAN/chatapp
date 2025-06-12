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


const generateAccessRefreshTokens = async function(userId) {
  try{
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();



    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});
    return {refreshToken, accessToken};
  }catch(err){
    console.log("ERROR: failure while generating tokens", err);
    throw new ApiError(501, err.message | "unable to generate tokens");
  }
}

const loginUser = asyncHandler(async (req, res) => {
  // get (username | email) & password from front
  // find user in db if not exist throw error
  // verify password
  // generate tokens for user
  // set refreshToken in DB
  // return accessToken back to front as cookie
  const {username, email, password} = req.body;
  if(!username && !email) throw new ApiError(400, "username or email is required");

  const user = await User.findOne({
    $or : [{username}, {email}]
  });

  if(!user) throw new ApiError(400, "user doesn't exist");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid) throw new ApiError(400, "Incorrect Password");

  const {refreshToken, accessToken}= await generateAccessRefreshTokens(user._id);

  const options = {
    httpOnly : true,
     secure : false // discuss with GPT
  }


  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            _id: user._id,
            name: user.username,
            email: user.email,
          },
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully!"
      )
    );


});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset : {
      refreshToken : 1
    }
  });

  const options = {
    httpOnly : true,
    secure : true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged out!"));


})

export {
  createUser,
  loginUser,
  logoutUser
}