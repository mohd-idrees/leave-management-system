<template>

<div class="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-300 to-indigo-600">

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
Reset Password
</h2>

<input
v-model="email"
class="border p-2 w-full mb-3 rounded"
placeholder="example@gmail.com"
/>

<input
:type="showPassword?'text':'password'"
v-model="newPassword"
class="border p-2 w-full mb-3 rounded"
placeholder="Minimum 8 characters"
/>

<input
:type="showConfirm?'text':'password'"
v-model="confirmPassword"
class="border p-2 w-full mb-3 rounded"
placeholder="Re-enter password"
/>

<p v-if="errorMessage" class="text-red-200 text-sm mb-3">
{{errorMessage}}
</p>

<button
@click="resetPassword"
:disabled="loading"
class="bg-white text-blue-600 font-semibold w-full py-2 rounded"
>

<span v-if="!loading">Reset Password</span>
<span v-if="loading">Loading...</span>

</button>

<p class="text-sm text-white mt-4">
Remember your password?
<router-link to="/" class="underline">
Back to Login
</router-link>
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
email:"",
newPassword:"",
confirmPassword:"",
errorMessage:"",
loading:false
}
},

methods:{

async resetPassword(){

this.loading=true

if(this.newPassword.length<8){
this.errorMessage="Password must be at least 8 characters"
this.loading=false
return
}

if(this.newPassword!==this.confirmPassword){
this.errorMessage="Passwords do not match"
this.loading=false
return
}

try{

await API.put("/auth/reset-password",{
email:this.email,
password:this.newPassword
})

alert("Password updated")
this.$router.push("/")

}catch(err){
this.errorMessage="Reset failed"
}

this.loading=false

}

}

}

</script>