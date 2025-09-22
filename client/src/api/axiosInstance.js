import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://cource-management-backend.vercel.app/",  // picks base url value based on env.local or env.production
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default axiosInstance