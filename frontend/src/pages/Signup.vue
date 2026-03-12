<template>

<div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-yellow-800 to-indigo-700">

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
Create Account
</h2>

<input v-model="name" class="border p-2 w-full mb-3 rounded" placeholder="Enter your full name"/>

<input v-model="email" class="border p-2 w-full mb-3 rounded" placeholder="example@gmail.com"/>

<div class="relative mb-3">
<input
:type="showPassword ? 'text':'password'"
v-model="password"
class="border p-2 w-full rounded"
placeholder="Minimum 8 characters"
/>
<button type="button" @click="togglePassword" class="absolute right-3 top-2">
👁
</button>
</div>

<div class="relative mb-3">
<input
:type="showConfirm ? 'text':'password'"
v-model="confirmPassword"
class="border p-2 w-full rounded"
placeholder="Re-enter password"
/>
<button type="button" @click="toggleConfirm" class="absolute right-3 top-2">
👁
</button>
</div>

<select v-model="role" class="border p-2 w-full mb-3 rounded">
<option disabled value="">Select Role</option>
<option value="employee">Employee</option>
<option value="employer">Employer</option>
</select>

<p v-if="errorMessage" class="text-red-200 text-sm mb-3">
{{errorMessage}}
</p>

<button
@click="signup"
:disabled="loading"
class="bg-white text-blue-600 font-semibold w-full py-2 rounded"
>

<span v-if="!loading">Register</span>
<span v-if="loading">Loading...</span>

</button>

<p class="text-sm text-white mt-4">
Already have an account?
<router-link to="/" class="underline">Login</router-link>
</p>

</div>

</div>

</template>

<script>

import API from "../services/api"
import {BriefcaseIcon} from "@heroicons/vue/24/solid"

export default{

components:{BriefcaseIcon},

data(){
return{
name:"",
email:"",
password:"",
confirmPassword:"",
role:"",
showPassword:false,
showConfirm:false,
errorMessage:"",
loading:false
}
},

methods:{

togglePassword(){this.showPassword=!this.showPassword},
toggleConfirm(){this.showConfirm=!this.showConfirm},

async signup(){

this.loading=true

const emailPattern=/^[a-zA-Z0-9._%+-]+@gmail\.com$/

if(!emailPattern.test(this.email)){
this.errorMessage="Enter valid Gmail"
this.loading=false
return
}

if(this.password.length<8){
this.errorMessage="Password must be at least 8 characters"
this.loading=false
return
}

if(this.password!==this.confirmPassword){
this.errorMessage="Passwords do not match"
this.loading=false
return
}

try{

await API.post("/auth/signup",{
name:this.name,
email:this.email,
password:this.password,
role:this.role
})

alert("Signup successful")
this.$router.push("/")

}catch(err){
this.errorMessage="Signup failed"
}

this.loading=false

}

}

}

</script>