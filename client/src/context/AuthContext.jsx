import React, { createContext, useContext, useState } from "react";
import api from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  function login(userData, userToken) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);

    setUser(userData);
    setToken(userToken);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  }

  // Fetch latest user data from database
  async function refreshUser() {
    try {
      if (!user?.id) return;

      const response = await api.get(`/user/${user.id}`);

      const updatedUser = response.data.user || response.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}