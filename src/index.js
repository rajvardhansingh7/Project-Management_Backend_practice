import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
})
// let myusername = process.env.database
// console.log("Value is:",myusername);
// console.log("hello from rajvardhan singh");

const port = process.env.PORT || 3000


// app.get('/', (req, res) => {
//   res.send('Hello')
// })

// app.get('/instagram', (req, res) => {
//   res.send('This is a instagram page')
// })

connectDB()
.then(()=>{
  app.listen(port, () => {
  console.log(`Example app listening on port http://Localhost:${port}`)
})
})
.catch((err)=>{
  console.error("MongoDB connection error", err)
  process.exit(1)
})