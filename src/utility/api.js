import axios from "axios";

const API_URL = "http://localhost:5555";

export const getProducts = async (category = "") => {
  try {
    const response = await axios.get(API_URL + "/products?category=" + category);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
