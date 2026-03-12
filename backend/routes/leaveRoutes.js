const express = require("express")
const router = express.Router()

const Leave = require("../models/Leave")

const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

// Apply Leave

router.post("/apply", authMiddleware, async (req,res)=>{

const {leaveType,startDate,endDate,reason} = req.body

const leave = new Leave({

employeeId:req.user.id,

leaveType,

startDate,

endDate,

reason

})

await leave.save()

res.json({message:"Leave applied successfully"})

})


// Get employee leaves

router.get("/my-leaves", authMiddleware, async (req,res)=>{

const leaves = await Leave.find({

employeeId:req.user.id

})

res.json(leaves)

})


// Employer: Get all leave requests

router.get("/all", authMiddleware, roleMiddleware("employer"), async (req,res)=>{

const leaves = await Leave.find()
.populate("employeeId","name email")

res.json(leaves)

})


// Approve leave

router.put("/approve/:id",
authMiddleware,
roleMiddleware("employer"),
async (req,res)=>{

await Leave.findByIdAndUpdate(req.params.id,{
status:"Approved"
})

res.json({message:"Leave approved"})

})

// Reject leave

router.put("/reject/:id",
authMiddleware,
roleMiddleware("employer"),
async (req,res)=>{

await Leave.findByIdAndUpdate(req.params.id,{
status:"Rejected"
})

res.json({message:"Leave rejected"})

})

module.exports = router