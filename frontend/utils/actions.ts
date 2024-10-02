import axios from "axios";
import { Product } from "./types";

export const fetchAllProducts = async () => {
  try {
    const products = await axios.get(
      "http://localhost/my_project/products.php"
    );
    return products.data;
  } catch (error) {
    console.error("Eroare la încărcarea produselor", error);
    throw new Error("Eroare la încărcarea produselor");
  }
};

export const fetchSingleProduct = async (
  productId: number
): Promise<Product> => {
  try {
    const response = await axios.get(
      `http://localhost/my_project/product.php?id=${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Eroare la fetch pentru produs:", error);
    throw error;
  }
};

export const addToCart = async (
  product: Product,
  quantity: number
): Promise<any> => {
  try {
    const productData = {
      product_id: product.id,
      quantity: quantity,
      price: product.price,
    };

    const response = await axios.post(
      "http://localhost/my_project/cart.php",
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to add product to cart");
    }

    const updatedCart = response.data;
    return updatedCart;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};
