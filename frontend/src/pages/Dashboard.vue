<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6">

<h2 class="text-xl font-semibold mb-2">
{{ greeting }}, {{ username }} 👋
</h2>


<!-- Stats Cards -->

<div class="grid grid-cols-4 gap-4 mb-6">

<div class="bg-blue-500 text-white p-4 rounded">
Total Leaves
<p class="text-2xl font-bold">{{ total }}</p>
</div>

<div class="bg-green-500 text-white p-4 rounded">
Approved
<p class="text-2xl font-bold">{{ approved }}</p>
</div>

<div class="bg-yellow-500 text-white p-4 rounded">
Pending
<p class="text-2xl font-bold">{{ pending }}</p>
</div>

<div class="bg-red-500 text-white p-4 rounded">
Rejected
<p class="text-2xl font-bold">{{ rejected }}</p>
</div>

</div>


<!-- Recent Leave Requests -->

<h2 class="text-xl font-bold mb-4">
Recent Leave Requests
</h2>

<table class="w-full border">

<thead>
<tr class="bg-gray-200">
<th class="p-2">Type</th>
<th class="p-2">Start</th>
<th class="p-2">End</th>
<th class="p-2">Status</th>
</tr>
</thead>

<tbody>

<tr v-if="recent.length === 0">
<td colspan="4" class="text-center p-4 text-gray-500">
No leave requests found
</td>
</tr>

<tr v-for="leave in recent" :key="leave._id">

<td class="p-2">{{leave.leaveType}}</td>

<td class="p-2">
{{ new Date(leave.startDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-2">

<span
v-if="leave.status === 'Pending'"
class="bg-yellow-200 px-2 py-1 rounded">
Pending
</span>

<span
v-else-if="leave.status === 'Approved'"
class="bg-green-200 px-2 py-1 rounded">
Approved
</span>

<span
v-else
class="bg-red-200 px-2 py-1 rounded">
Rejected
</span>

</td>

</tr>

</tbody>

</table>

</div>

</div>

</template>


<script>

import Sidebar from "../components/Sidebar.vue"
import API from "../services/api"

export default{

components:{Sidebar},

data(){
return{

leaves:[],
recent:[],
total:0,
approved:0,
pending:0,
rejected:0,
username:"",
greeting:""

}
},

async mounted(){

this.username = localStorage.getItem("name")

const hour = new Date().getHours()

if(hour < 12){
this.greeting = "Good Morning "
}
else if(hour < 18){
this.greeting = "Good Afternoon "
}
else{
this.greeting = "Good Evening "
}

const token = localStorage.getItem("token")

const res = await API.get("/leave/my-leaves",{
headers:{authorization:token}
})

this.leaves = res.data

this.total = this.leaves.length
this.approved = this.leaves.filter(l=>l.status==="Approved").length
this.pending = this.leaves.filter(l=>l.status==="Pending").length
this.rejected = this.leaves.filter(l=>l.status==="Rejected").length

this.recent = this.leaves.slice(0,5)

}

}

</script>