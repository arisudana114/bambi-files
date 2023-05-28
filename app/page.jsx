import React from "react";
import ListProducts from "@/components/products/ListProducts";

import queryString from "query-string";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const response = await fetch(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  const data = await response.json();

  return data;
};

const HomePage = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default HomePage;
