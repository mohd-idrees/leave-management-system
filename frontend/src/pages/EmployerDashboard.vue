<template>

<div class="flex">

<!-- Sidebar -->
<Sidebar @changeTab="currentTab = $event"/>

<div class="flex-1 p-6">

<!-- Header -->

<div class="flex justify-between items-center mb-6">

<div>
<h1 class="text-2xl font-bold">
Welcome, {{ name }}
</h1>

<p class="text-gray-500">
{{ today }} | {{ time }}
</p>
</div>


</div>


<!-- DASHBOARD TAB -->

<div v-if="currentTab === 'dashboard'">

<!-- Stats -->

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

<h2 class="text-xl font-bold mb-3">
Recent Leave Requests
</h2>

<table class="w-full border">

<thead class="bg-gray-200">
<tr>
<th class="p-2">Employee</th>
<th class="p-2">Leave Type</th>
<th class="p-2">Start</th>
<th class="p-2">End</th>
<th class="p-2">Status</th>
</tr>
</thead>

<tbody>

<tr
v-for="leave in recentLeaves"
:key="leave._id"
class="text-center border-t"
>

<td class="p-2">
{{ leave.employeeId?.name }}
</td>

<td class="p-2">
{{ leave.leaveType }}
</td>

<td class="p-2">
{{ new Date(leave.startDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ leave.status }}
</td>

</tr>

</tbody>

</table>

</div>



<!-- ALL REQUESTS TAB -->

<div v-if="currentTab === 'requests'">

<h2 class="text-xl font-bold mb-3">
All Leave Requests
</h2>

<table class="w-full border">

<thead class="bg-gray-200">

<tr>
<th class="p-2">Employee</th>
<th class="p-2">Leave Type</th>
<th class="p-2">Start</th>
<th class="p-2">End</th>
<th class="p-2">Status</th>
<th class="p-2">Action</th>
</tr>

</thead>

<tbody>

<tr
v-for="leave in leaves"
:key="leave._id"
class="text-center border-t"
>

<td class="p-2">
{{ leave.employeeId?.name }}
</td>

<td class="p-2">
{{ leave.leaveType }}
</td>

<td class="p-2">
{{ new Date(leave.startDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ leave.status }}
</td>

<td class="p-2">

<button
@click="approveLeave(leave._id)"
class="bg-green-500 text-white px-3 py-1 rounded mr-2"
>
Approve
</button>

<button
@click="rejectLeave(leave._id)"
class="bg-red-500 text-white px-3 py-1 rounded"
>
Reject
</button>

</td>

</tr>

</tbody>

</table>

</div>



<!-- PROFILE TAB -->

<div v-if="currentTab === 'profile'">

<h2 class="text-xl font-bold mb-4">
Employer Profile
</h2>

<div class="bg-white shadow-lg rounded-lg p-6 w-96">

<div class="mb-4">
<p class="text-gray-500 text-sm">Name</p>
<p class="text-lg font-semibold">{{ name }}</p>
</div>

<div class="mb-4">
<p class="text-gray-500 text-sm">Email</p>
<p class="text-lg font-semibold">{{ email }}</p>
</div>

<div>
<p class="text-gray-500 text-sm">Role</p>
<p class="text-lg font-semibold capitalize">{{ role }}</p>
</div>

</div>

</div>

</div>

</div>

</template>



<script>

import Sidebar from "../components/Sidebar.vue"
import API from "../services/api"

export default{

components:{ Sidebar },

data(){
return{

leaves:[],
recentLeaves:[],
name:"",
email:"",
role:"",
today:"",
time:"",
currentTab:"dashboard",

total:0,
approved:0,
pending:0,
rejected:0

}
},

methods:{

logout(){
localStorage.clear()
this.$router.push("/")
},

updateTime(){
this.time = new Date().toLocaleTimeString()
},

async getAllLeaves(){

const token = localStorage.getItem("token")

const res = await API.get("/leave/all",{
headers:{ authorization: token }
})

this.leaves = res.data

this.total = this.leaves.length
this.approved = this.leaves.filter(l=>l.status==="Approved").length
this.pending = this.leaves.filter(l=>l.status==="Pending").length
this.rejected = this.leaves.filter(l=>l.status==="Rejected").length

this.recentLeaves = this.leaves.slice(0,5)

},

async approveLeave(id){

const token = localStorage.getItem("token")

await API.put(`/leave/approve/${id}`,{},{
headers:{ authorization: token }
})

this.getAllLeaves()

},

async rejectLeave(id){

const token = localStorage.getItem("token")

await API.put(`/leave/reject/${id}`,{},{
headers:{ authorization: token }
})

this.getAllLeaves()

}

},

mounted(){

this.name = localStorage.getItem("name")
this.email = localStorage.getItem("email")
this.role = localStorage.getItem("role")

const date = new Date()

this.today = date.toLocaleDateString("en-US",{
weekday:"long",
year:"numeric",
month:"long",
day:"numeric"
})

this.updateTime()

setInterval(()=>{
this.updateTime()
},1000)

this.getAllLeaves()

}

}

</script>