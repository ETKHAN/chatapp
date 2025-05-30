import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(cors({
  origin : process.env.ORIGIN,
  credentials : true
}));

dotenv.config({
  path: "./.env"
});

app.use(express.static("public"));

app.use(cookieParser());

app.use(urlencoded({limit:"16kb"}));

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}));


export {app}