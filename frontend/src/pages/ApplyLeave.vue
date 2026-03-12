<template>

<div class="flex">

<Sidebar/>

<div class="flex-1 p-6">

<h1 class="text-2xl font-bold mb-6">
Apply Leave
</h1>

<div class="bg-white p-6 rounded shadow w-96">

<!-- Leave Type Dropdown -->

<div class="mb-3">

<label class="block mb-1 font-semibold">
Leave Type
</label>

<select
v-model="leaveType"
class="border p-2 w-full rounded"
>

<option disabled value="">
Select Leave Type
</option>

<option value="Sick Leave">
Sick Leave
</option>

<option value="Casual Leave">
Casual Leave
</option>

<option value="Vacation Leave">
Vacation Leave
</option>

<option value="Emergency Leave">
Emergency Leave
</option>

<option value="Other">
Other
</option>

</select>

</div>


<!-- Custom Leave Type -->

<div v-if="leaveType === 'Other'" class="mb-3">

<label class="block mb-1 font-semibold">
Specify Leave Type
</label>

<input
v-model="customLeaveType"
class="border p-2 w-full rounded"
placeholder="Enter leave type"
/>

</div>


<!-- Start Date -->

<div class="mb-3">

<label class="block mb-1 font-semibold">
Start Date
</label>

<input
type="date"
v-model="startDate"
class="border p-2 w-full rounded"
/>

</div>


<!-- End Date -->

<div class="mb-3">

<label class="block mb-1 font-semibold">
End Date
</label>

<input
type="date"
v-model="endDate"
class="border p-2 w-full rounded"
/>

</div>


<!-- Reason -->

<div class="mb-3">

<label class="block mb-1 font-semibold">
Reason
</label>

<textarea
v-model="reason"
class="border p-2 w-full rounded"
placeholder="Enter reason"
></textarea>

</div>


<!-- Submit Button -->

<button
@click="applyLeave"
class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
>
Apply Leave
</button>

</div>

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

leaveType:"",
customLeaveType:"",
startDate:"",
endDate:"",
reason:""

}
},

methods:{

async applyLeave(){

try{

const token = localStorage.getItem("token")

const type =
this.leaveType === "Other"
? this.customLeaveType
: this.leaveType

await API.post("/leave/apply",{

leaveType:type,
startDate:this.startDate,
endDate:this.endDate,
reason:this.reason

},{
headers:{authorization:token}
})

alert("Leave applied successfully")

this.$router.push("/dashboard")

}catch(err){

alert("Failed to apply leave")

}

}

}

}

</script>