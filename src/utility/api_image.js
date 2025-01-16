import axios from "axios";
import { toast } from "sonner";

import { API_URL } from "../constants";

// public API
export const uploadImage = async (image) => {
  try {
    // create new form data(to send by form not json)
    const formData = new FormData();
    formData.append("image", image); //"image" must be the same as backend for load
    const response = await axios.post(API_URL + "/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
