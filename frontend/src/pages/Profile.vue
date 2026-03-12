<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 flex items-center justify-center bg-gray-100">

<div class="bg-white shadow-lg rounded-lg p-8 w-96">

<h1 class="text-2xl font-bold mb-6 text-center">
User Profile
</h1>

<div class="space-y-4">

<div>
<p class="text-gray-500 text-sm">Name</p>
<p class="font-semibold text-lg">{{name}}</p>
</div>

<div>
<p class="text-gray-500 text-sm">Email</p>
<p class="font-semibold text-lg">{{email}}</p>
</div>

<div>
<p class="text-gray-500 text-sm">Role</p>
<p class="font-semibold text-lg capitalize">{{role}}</p>
</div>

</div>

<button
@click="$router.back()"
class="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
Back
</button>

</div>

</div>

</div>

</template>


<script>

import Sidebar from "../components/Sidebar.vue"

export default{

components:{Sidebar},

data(){
return{

name:"",
email:"",
role:""

}
},

mounted(){

this.name = localStorage.getItem("name")
this.role = localStorage.getItem("role")

// email stored during login
this.email = localStorage.getItem("email")

}

}

</script>