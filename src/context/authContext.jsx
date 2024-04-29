import React, {createContext, useState, useEffect} from "react";

import {
  BLOG_API_LOGIN,
  BLOG_API_LOGIN_ADMIN,
  BLOG_API_REGISTER,
  BLOG_API_FETCH_USERS,
} from "../constants/constants";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAuthorization, setUserAuthorization] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserDataCreate, setNewUserDataCreate] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [newUserDataUpdate, setNewUserDataUpdate] = useState({
    name: "",
    email: "",
    role: "USER",
  });
  // USERS LOGIC
  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      // Verificar se há um token de acesso válido
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      const response = await fetch(BLOG_API_FETCH_USERS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${BLOG_API_FETCH_USERS}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user._id !== userId));

      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser(null);
        setNewUserDataUpdate({
          name: "",
          email: "",
          role: "USER",
        });
      }

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const registerNewUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(BLOG_API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserDataCreate),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      setNewUserDataCreate({
        name: "",
        email: "",
        password: "",
        role: "USER",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error registering new user:", error);
    }
  };
  const updateUser = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `${BLOG_API_FETCH_USERS}/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: newUserDataUpdate.name,
            email: newUserDataUpdate.email,
            role: newUserDataUpdate.role,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setSelectedUser(null);
      setNewUserDataUpdate({
        name: "",
        email: "",
        role: "USER",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch(BLOG_API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const userData = await response.json();
        const userWithoutPassword = userData.user;
        const accessToken = userData.accessToken;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        localStorage.setItem("accessToken", accessToken);
        setUser(userWithoutPassword);
        setLoading(false);
        window.location.href = "/homepage";
      } else {
        throw new Error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      throw new Error("Error logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch(BLOG_API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        window.location.href = "/";
        setLoading(false);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError("Invalid name, email, or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminAuthorization");
    localStorage.removeItem("adminAccessTokenAuthorization");
    setUser(null);
  };
  const logoutAdmin = () => {
    localStorage.removeItem("adminAuthorization");
    localStorage.removeItem("adminAccessTokenAuthorization");
    setUser(null);
    window.location.href = "/homepage";
  };

  const loginAdmin = async (email, password) => {
    try {
      const response = await fetch(BLOG_API_LOGIN_ADMIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const userWithoutPassword = responseData.user;
        const accessToken = responseData.accessToken;
        localStorage.setItem(
          "adminAuthorization",
          JSON.stringify(userWithoutPassword)
        );
        localStorage.setItem("adminAccessTokenAuthorization", accessToken);
        console.log("Response data:", responseData);
        window.location.href = "/dashboard";
      } else {
        throw new Error("Admin Login failed. Please check your credentials.");
      }
    } catch (error) {
      throw new Error("Admin Login failed. Please check your credentials.");
    }
  };
  useEffect(() => {
    const storedUserAuthorization = localStorage.getItem("adminAuthorization");
    if (storedUserAuthorization) {
      setUserAuthorization(true);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        login,
        logout,
        signup,
        loginAdmin,
        userAuthorization,
        logoutAdmin,
        setLoading,
        loading,
        users,
        selectedUser,
        setSelectedUser,
        newUserDataCreate,
        setNewUserDataCreate,
        newUserDataUpdate,
        setNewUserDataUpdate,
        deleteUser,
        registerNewUser,
        updateUser,
        fetchUsers,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
