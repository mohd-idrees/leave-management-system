<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6">

<h2 class="text-xl font-semibold mb-1">
{{ greeting }}, {{ username }} 👋
</h2>

<p class="text-gray-500 mb-4">
{{ today }} | {{ time }}
</p>


<!-- STATS -->

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


<!-- RECENT LEAVE REQUESTS -->

<h2 class="text-xl font-bold mb-4">
Recent Leave Requests
</h2>

<table class="w-full border">

<thead>
<tr class="bg-gray-200">
<th class="p-2">Leave Type</th>
<th class="p-2">Start</th>
<th class="p-2">End</th>
<th class="p-2">Status</th>
</tr>
</thead>

<tbody>

<tr v-if="recentLeaves.length === 0">
<td colspan="4" class="text-center p-4 text-gray-500">
No recent leave requests
</td>
</tr>

<tr v-for="leave in recentLeaves" :key="leave._id">

<td class="p-2">{{leave.leaveType}}</td>

<td class="p-2">
{{ new Date(leave.startDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-2">

<span
v-if="leave.status==='Approved'"
class="bg-green-100 text-green-700 px-2 py-1 rounded"
>
Approved
</span>

<span
v-else-if="leave.status==='Pending'"
class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
>
Pending
</span>

<span
v-else
class="bg-red-100 text-red-700 px-2 py-1 rounded"
>
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
recentLeaves:[],
username:"",
greeting:"",
today:"",
time:"",

total:0,
approved:0,
pending:0,
rejected:0

}
},

async mounted(){

this.username = localStorage.getItem("name")

const hour = new Date().getHours()

if(hour < 12) this.greeting="Good Morning"
else if(hour < 18) this.greeting="Good Afternoon"
else this.greeting="Good Evening"

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

const token = localStorage.getItem("token")

const res = await API.get("/leave/my-leaves",{
headers:{authorization:token}
})

this.leaves = res.data

// Stats

this.total = this.leaves.length
this.approved = this.leaves.filter(l=>l.status==="Approved").length
this.pending = this.leaves.filter(l=>l.status==="Pending").length
this.rejected = this.leaves.filter(l=>l.status==="Rejected").length

// Recent Leaves

this.recentLeaves = this.leaves.slice(0,5)

},

methods:{
updateTime(){
this.time = new Date().toLocaleTimeString()
}
}

}

</script>