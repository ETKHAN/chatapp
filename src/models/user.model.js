import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username : {
      type : String,
      unique : true,
      required : true,
      lowercase : true,
    },
    email : {
      type : String,
      required : true,
      unique : true,

    },
    password : {
      type : String,
      required : true
    },
    avatar : {
      type : String
    },
    refreshToken : {
      type : String,
    }
  },{
    timestamps : true
  }
);

userSchema.pre("save", async function(next){

  try{

    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();

  }catch(error){
    console.log("ERROR: unable to hash the password!", error);
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password){

  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = async function(){
  return jwt.sign(
    { _id: this._id},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  )
}

userSchema.methods.generateAccessToken = async function(){
  return jwt.sign(
    { _id: this._id},
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  )
}

export const User = mongoose.model("User", userSchema);