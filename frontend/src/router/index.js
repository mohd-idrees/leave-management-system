import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/Login.vue"
import Signup from "../pages/Signup.vue"
import Dashboard from "../pages/Dashboard.vue"
import ApplyLeave from "../pages/ApplyLeave.vue"
import EmployerDashboard from "../pages/EmployerDashboard.vue"
import LeaveRequests from "../pages/LeaveRequests.vue"
import MyLeaves from "../pages/MyLeaves.vue"
import Profile from "../pages/Profile.vue"
import ForgotPassword from "../pages/ForgotPassword.vue"
const routes = [

{ path:"/", component:Login },

{ path:"/signup", component:Signup },

{ path:"/dashboard", component:Dashboard },

{ path:"/apply", component:ApplyLeave },

{ path:"/my-leaves", component:MyLeaves },

{ path:"/profile", component:Profile },

{ path:"/employer-dashboard", component:EmployerDashboard },

{ path:"/forgot-password", component:ForgotPassword }
]
const router = createRouter({
history:createWebHistory(),
routes
})

router.beforeEach((to,from,next)=>{

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

if(to.meta.requiresAuth && !token){

return next("/")

}

if(to.meta.role && to.meta.role !== role){

return next("/")

}

next()

})

export default router