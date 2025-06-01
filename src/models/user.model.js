import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
})

export const User = mongoose.model("User", userSchema);