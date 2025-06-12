import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async (req, res, next) => {

  try{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token) throw new ApiError(401, "Unauthorized Request!");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken) throw new ApiError(401, "Invalid accesstoken");

    const user = await User.findById(decodedToken._id);

    req.user = user;
    
    next();

  }catch(err){
    throw new ApiError(401, err?.message || "Invalid Access Token" ); 
  }

})

export {
  verifyJWT
}