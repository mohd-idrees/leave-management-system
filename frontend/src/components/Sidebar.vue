<template>

<div class="h-screen w-60 bg-blue-700 text-white flex flex-col p-4">

<h1 class="text-xl font-bold mb-6">
Leave System
</h1>

<!-- User Profile -->

<div class="bg-blue-600 p-4 rounded mb-6 flex items-center space-x-3">

<div
class="bg-white text-blue-700 font-bold w-10 h-10 flex items-center justify-center rounded-full"
>
{{ avatarLetter }}
</div>

<div>
<p class="text-sm text-gray-200">Logged in as</p>
<p class="font-semibold">{{ username }}</p>
<p class="text-xs text-gray-300 capitalize">{{ role }}</p>
</div>

</div>


<!-- EMPLOYEE MENU -->

<router-link
v-if="role === 'employee'"
to="/dashboard"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded"
>

<HomeIcon class="w-5 h-5"/>

<span>Dashboard</span>

</router-link>


<router-link
v-if="role === 'employee'"
to="/apply"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded"
>

<PlusCircleIcon class="w-5 h-5"/>

<span>Apply Leave</span>

</router-link>


<router-link
v-if="role === 'employee'"
to="/my-leaves"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded"
>

<DocumentTextIcon class="w-5 h-5"/>

<span>My Leaves</span>

</router-link>


<router-link
v-if="role === 'employee'"
to="/profile"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded"
>

<UserCircleIcon class="w-5 h-5"/>

<span>Profile</span>

</router-link>


<!-- EMPLOYER MENU -->

<button
v-if="role === 'employer'"
@click="$emit('changeTab','dashboard')"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded w-full text-left"
>

<HomeIcon class="w-5 h-5"/>

<span>Dashboard</span>

</button>


<button
v-if="role === 'employer'"
@click="$emit('changeTab','requests')"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded w-full text-left"
>

<ClipboardDocumentListIcon class="w-5 h-5"/>

<span>All Leave Requests</span>

</button>


<button
v-if="role === 'employer'"
@click="$emit('changeTab','profile')"
class="flex items-center space-x-2 mb-3 hover:bg-blue-600 p-2 rounded w-full text-left"
>

<UserCircleIcon class="w-5 h-5"/>

<span>Profile</span>

</button>


<!-- Logout -->

<button
@click="logout"
class="flex items-center space-x-2 mt-auto bg-red-500 p-2 rounded"
>

<ArrowRightOnRectangleIcon class="w-5 h-5"/>

<span>Logout</span>

</button>

</div>

</template>



<script>

import {
HomeIcon,
PlusCircleIcon,
DocumentTextIcon,
UserCircleIcon,
ClipboardDocumentListIcon,
ArrowRightOnRectangleIcon
} from "@heroicons/vue/24/solid"

export default{

components:{
HomeIcon,
PlusCircleIcon,
DocumentTextIcon,
UserCircleIcon,
ClipboardDocumentListIcon,
ArrowRightOnRectangleIcon
},

data(){
return{

username:"",
role:"",
avatarLetter:""

}
},

mounted(){

this.username = localStorage.getItem("name")
this.role = localStorage.getItem("role")

if(this.username){
this.avatarLetter = this.username.charAt(0).toUpperCase()
}

},

methods:{

logout(){

localStorage.removeItem("token")
localStorage.removeItem("role")
localStorage.removeItem("name")
localStorage.removeItem("email")

this.$router.push("/")

}

}

}

</script>