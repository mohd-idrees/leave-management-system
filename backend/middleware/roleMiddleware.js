const roleMiddleware = (role) => {

return (req,res,next)=>{

if(req.user.role !== role){

return res.status(403).json({
message:"Access denied. Only employer allowed."
})

}

next()

}

}

module.exports = roleMiddleware