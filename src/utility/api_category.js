import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

// add new category
export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      {
        name: name,
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
    toast.error(error.message);
  }
};

// delete category
export const deleteCategory = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + "/categories/" + _id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// edit category
export const updateCategory = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + _id,
      {
        name: name,
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
  }
};
