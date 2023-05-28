import React from "react";
import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
  const response = await fetch(`${process.env.API_URL}/api/products/${id}`);
  const data = await response.json();
  return data;
};

const HomePage = async ({ params }) => {
  const data = await getProduct(params.id);

  return <UpdateProduct data={data.product} />;
};

export default HomePage;
