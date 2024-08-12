const express = require("express");
const cors = require('cors')
const connectDb = require("./config/db")
const booksRouter = require("./routes/books")
const categoryRouter = require("./routes/categories")
const userRouter = require("./routes/user")
const app = express();
const PORT =  process.env.PORT || 3000

connectDb()

app.use(express.json({extended : false})) //is used to set up middleware that parses incoming requests with JSON payloads

app.get("/", (req,res) => res.send("App is Running"))
app.use("/api/books" , booksRouter);
app.use("/api/categories" , categoryRouter);
app.use("/api/user",userRouter)


app.listen(PORT,() => {
 console.log(`Server is running on Port${PORT}`)
})

