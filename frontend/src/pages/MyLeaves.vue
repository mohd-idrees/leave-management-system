<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6">

<h1 class="text-2xl font-bold mb-6">
My Leave Requests
</h1>

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

<tr v-if="leaves.length === 0">
<td colspan="4" class="text-center p-4 text-gray-500">
No leave requests found
</td>
</tr>

<tr v-for="leave in leaves" :key="leave._id">

<td class="p-2">{{leave.leaveType}}</td>

<td class="p-2">
{{ new Date(leave.startDate).toLocaleDateString() }}
</td>

<td class="p-2">
{{ new Date(leave.endDate).toLocaleDateString() }}
</td>

<td class="p-2">{{leave.status}}</td>

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
leaves:[]
}
},

async mounted(){

const token = localStorage.getItem("token")

const res = await API.get("/leave/my-leaves",{
headers:{authorization:token}
})

this.leaves = res.data

}

}

</script>