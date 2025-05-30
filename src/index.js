
import { app } from "./app.js";



app.get('/', (_, res) => {
  res.send("<h1>Welcome To Backend</h1>")

})


app.listen(process.env.PORT || 5500, () => {
  console.log("Server is running on localhost:", process.env.PORT || 5500);
})
