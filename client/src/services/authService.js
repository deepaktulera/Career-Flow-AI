import api from "./axios"

export async function registerUser(data) {
  try {
    const response = await api.post("/register", data)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function loginUser(data) {
  try {
    const response = await api.post("/login", data)

    return response.data
  } catch (error) {
    throw error
  }
}