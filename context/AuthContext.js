"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data?.user) {
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/session?update");

      const data = await response.json();

      if (data?.user) {
        setUser(data.user);
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API_URL}/api/auth/me/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.user) {
        loadUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/auth/me/update_password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data?.success) {
        router.replace("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      const data = await response.json();

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/address/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      });

      const data = await response.json();

      if (data?.address) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/address/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data?.success) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        updated,
        setUpdated,
        setUser,
        registerUser,
        updateProfile,
        addNewAddress,
        updateAddress,
        deleteAddress,
        updatePassword,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
