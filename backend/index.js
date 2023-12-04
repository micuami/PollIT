require("dotenv").config() 
const express = require("express") 
const morgan = require("morgan") 
const {log} = require("mercedlogger") 
const cors = require("cors") 
const UserRouter = require("./controllers/userController") 


const PORT = 5000;
const app = express()


app.use(cors()) 
app.use(morgan("tiny")) 
app.use(express.json()) 



app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/users", UserRouter) 
app.use("/polls", PollRouter)

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))