const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

// Root route
app.get("/", (req,res)=>{
res.send("Leave Management Backend is running")
})

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/leave", require("./routes/leaveRoutes"))

const PORT = process.env.PORT || 5000

// Connect MongoDB first
mongoose.connect(process.env.MONGO_URI)
.then(()=>{

console.log("MongoDB Connected")

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})

})
.catch(err=>{
console.log("MongoDB Connection Error:", err)
})