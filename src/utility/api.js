import axios from "axios";
import { toast } from "sonner";
const API_URL = "http://localhost:5555";

// get all products
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get one product
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// add new product
export const addNewProducts = async (name, description, price, category) => {
  try {
    const response = await axios.post(API_URL + "/products", {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// edit product
export const editProducts = async (_id , name, description, price, category) => {
  try {
    const response = await axios.put(API_URL + "/products/" + _id , {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// delete product
export const deleteProducts = async (_id) => {
  try {
    const response = await axios.delete(API_URL + "/products/" + _id );
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// get all category
export const getCategory = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
