"use client";

import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const updateProduct = async (product, id) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/admin/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (data) {
        setUpdated(true);
        router.replace(`/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const newProduct = async (product) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/admin/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/admin/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data?.success) {
        router.replace(`/admin/products`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API_URL}/api/admin/products/upload_images/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.data) {
        setLoading(false);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        uploadProductImages,
        clearErrors,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
