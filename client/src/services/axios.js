import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Automatically attach token to protected / verify routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `JWT ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api