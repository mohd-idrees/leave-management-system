<template>

<div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-500 to-indigo-600">

<div class="backdrop-blur-lg bg-white/20 border border-white/30 p-8 rounded-xl shadow-lg w-96 text-center">

<div class="flex justify-center mb-3">
<div class="bg-white text-blue-600 p-3 rounded-full shadow">
<BriefcaseIcon class="w-8 h-8"/>
</div>
</div>

<h1 class="text-3xl font-bold text-white mb-4">
Leave Management System
</h1>

<h2 class="text-xl text-white mb-6">
Login
</h2>

<div class="relative mb-3">
<EnvelopeIcon class="w-5 h-5 absolute left-3 top-3 text-gray-300"/>
<input
v-model="email"
class="border border-white/40 bg-white/30 text-white placeholder-gray-200 pl-10 p-2 w-full rounded"
placeholder="example@gmail.com"
/>
</div>

<div class="relative mb-2">
<LockClosedIcon class="w-5 h-5 absolute left-3 top-3 text-gray-300"/>
<input
:type="showPassword ? 'text' : 'password'"
v-model="password"
class="border border-white/40 bg-white/30 text-white placeholder-gray-200 pl-10 p-2 w-full rounded"
placeholder="Enter your password"
/>

<button type="button" @click="togglePassword" class="absolute right-3 top-2 text-white">
<EyeIcon v-if="!showPassword" class="w-5 h-5"/>
<EyeSlashIcon v-else class="w-5 h-5"/>
</button>

</div>

<div class="text-right mb-3">
<router-link to="/forgot-password" class="text-white text-sm underline">
Forgot Password?
</router-link>
</div>

<p v-if="errorMessage" class="text-red-200 text-sm mb-3">
{{errorMessage}}
</p>

<button
@click="login"
:disabled="loading"
class="bg-white text-blue-600 font-semibold w-full py-2 rounded flex justify-center items-center"
>

<span v-if="!loading">Login</span>

<span v-if="loading" class="flex items-center">
<svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"></svg>
Loading...
</span>

</button>

<p class="text-sm text-white mt-4">
Don't have an account?
<router-link to="/signup" class="underline">
Create account
</router-link>
</p>

</div>

</div>

</template>

<script>

import API from "../services/api"

import {
EnvelopeIcon,
LockClosedIcon,
EyeIcon,
EyeSlashIcon,
BriefcaseIcon
} from "@heroicons/vue/24/solid"

export default{

components:{
EnvelopeIcon,
LockClosedIcon,
EyeIcon,
EyeSlashIcon,
BriefcaseIcon
},

data(){
return{
email:"",
password:"",
showPassword:false,
errorMessage:"",
loading:false
}
},

methods:{

togglePassword(){
this.showPassword=!this.showPassword
},

async login(){

this.loading=true

try{

const res = await API.post("/auth/login",{
email:this.email,
password:this.password
})

localStorage.setItem("token",res.data.token)
localStorage.setItem("role",res.data.user.role)
localStorage.setItem("name",res.data.user.name)
localStorage.setItem("email",res.data.user.email)

if(res.data.user.role==="employer"){
this.$router.push("/employer-dashboard")
}else{
this.$router.push("/dashboard")
}

}catch(err){
this.errorMessage="Invalid email or password"
}

this.loading=false

}

}

}

</script>