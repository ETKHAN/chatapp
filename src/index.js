import { app } from "./app.js";
import connectDB from "./db/connectDB.js";




connectDB().then((connectionInstance) => {
  app.on("error", () => {
    console.log("ERROR: failure in running App")
  });


  app.listen(process.env.PORT || 5500, () => {
    console.log(" ⚙⚙ Server is live on localhost:", process.env.PORT || 5500);
  })
}).catch(err => {
  console.log("ERROR: mongo DB connection failure ", err?.message);
})


