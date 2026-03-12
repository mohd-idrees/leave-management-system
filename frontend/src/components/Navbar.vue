<template>

<nav class="bg-blue-600 text-white p-4 flex justify-between">

<h1 class="font-bold text-lg">
Leave Management
</h1>

<div class="space-x-4">

<router-link to="/dashboard">Dashboard</router-link>

<router-link to="/apply">Apply Leave</router-link>

<button @click="logout" class="bg-red-500 px-3 py-1 rounded">
Logout
</button>

</div>

</nav>

</template>

<script>

export default{

methods:{

logout(){

localStorage.removeItem("token")
localStorage.removeItem("role")

this.$router.push("/")

}

}

}

</script>