import { get } from "../services/network";
import { useState } from "react";

export default async function useProduct() {
  const data = await get("/product/getAllProduct").then((response) => response);

  const [products, setProducts] = useState(data.data);

  return {
    products,
    setProducts: setProducts(data.data),
  };
}
