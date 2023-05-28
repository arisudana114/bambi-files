import React from "react";
import queryString from "query-string";
import Products from "@/components/admin/Products";

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const response = await fetch(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  const data = await response.json();

  return data;
};

const HomePage = async ({ searchParams }) => {
  const data = await getProducts(searchParams);

  return <Products data={data} />;
};

export default HomePage;
