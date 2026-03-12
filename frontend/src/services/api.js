import axios from "axios"

const API = axios.create({
  baseURL: "https://leave-management-backend-spx0.onrender.com/api"
})

export default API