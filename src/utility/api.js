import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

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
export const addNewProducts = async (
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/products",
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        token,
      },
      {
        headers: {
          //normalized headers
          Authorization: "Bearer " + token,
          // Bearer sdkjfzndsfkja12kmn2431?2...
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// edit product
export const editProducts = async (
  _id,
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/products/" + _id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// delete product (admin api)
export const deleteProducts = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/products/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
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

// get one category
export const getOneCategory = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + _id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//=============== billplz stuff ==============//

// add product to cart
export function AddToCart(product) {
  // get the current items in the cart
  const cart = getCart();
  // find if the product already exist in the cart or not
  const selectedProduct = cart.find((p) => p._id === product._id);
  if (selectedProduct) {
    // if product already exists, just increase the quantity
    selectedProduct.quantity++;
  } else {
    // if not exist, add it into the cart
    // long method
    // const newProduct = { ...product };
    // newProduct.quantity = 1;
    // cart.push(newProduct);
    // short method
    cart.push({
      ...product,
      quantity: 1,
    });
  }
  // update the cart with the latest data
  updateCart(cart);
}

// get items in the cart
export function getCart() {
  // first iteration
  // get cart items from local storage
  const cart = JSON.parse(localStorage.getItem("cart"));
  //   if (cart) {
  //     return cart;
  //   } else {
  //     return [];
  //   }
  // second iteration
  //   return cart ? cart : [];
  // third iteration
  return cart || [];
}

// update the cart in the local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// delete item from the cart
export function deleteItemFromCart(_id) {
  // get the current cart
  // long method
  //   const cart = getCart();
  //   const updatedCart = cart.filter((p) => p._id !== _id);
  //   updateCart(updatedCart);
  // short method
  updateCart(getCart().filter((p) => p._id !== _id));
}

// get total price in cart
export function getTotalCartPrice() {
  const cart = getCart();
  let total = 0;
  cart.forEach((item) => {
    total = total + item.price * item.quantity;
  });
  return total.toFixed(2);
}

// clear the cart
export function clearCart() {
  localStorage.removeItem("cart");
}

// Create Order
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/orders",
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
        token,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

// Get Orders
export const getOrders = async (token) => {
  try {
    const response = await axios.get(API_URL + "/orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get order by id
export const getOrder = async (_id, token) => {
  try {
    const response = await axios.get(API_URL + "/orders/" + _id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// Delete Order
export const deleteOrder = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + "/orders/" + _id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// Update Order
export const updateOrder = async (_id, status, token) => {
  try {
    const response = await axios.put(
      API_URL + "/orders/" + _id,
      {
        status: status,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data);
  }
};

// payment slip
export const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  try {
    const response = await axios.post(API_URL + "/payment", {
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// email
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// ======== Auth ======== //
// login
export const authLogin = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// Signup
export const authSignup = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCurrentUser = (cookies) => {
  return cookies.currentUser ? cookies.currentUser : null;
};

export const isUserLoggedIn = (cookies) => {
  return getCurrentUser(cookies) ? true : false;
};

export const isAdmin = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.role === "admin" ? true : false;
};

// function to access function
export const getUserToken = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.token ? currentUser.token : "";
};

// function to get currentUser name via cookies
export const getUserName = (cookies) => {
  const currentUser = getCurrentUser(cookies);
  return currentUser && currentUser.name ? currentUser.name : "";
};
