import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "sonner";
import {
  addNewProducts,
  getUserToken,
  isAdmin,
  getCategory,
} from "../../utility/api";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utility/api_image";
import { API_URL } from "../../constants";

function AddNewProduct() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    setImage(image_url);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    //trigger the add new product API
    const newProductData = await addNewProducts(
      name,
      description,
      price,
      category,
      image,
      token
    );

    // check if the newProductData exist or not
    if (newProductData) {
      // show success error
      toast.success("Product has been added successfully");
      navigate("/");
    }
  };

  return (
    <Container>
      <Header label="Add New" />
      <Card>
        <CardContent>
          <Typography variant="h4" align="center">
            Add New Product
          </Typography>
          <Box mb={2}>
            <TextField
              label="Name"
              required
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Price"
              required
              fullWidth
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <FormControl variant="filled" style={{ minWidth: 220 }}>
              <InputLabel id="demo-simple-select-filled-label">
                All Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {categories.map((item) => (
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            {image !== "" ? (
              <>
                <div>
                  <img
                    src={`${API_URL}/${image}`}
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                    }}
                  />
                </div>
                <Button
                  onClick={() => setImage("")}
                  variant="contained"
                  color="error"
                >
                  Remove
                </Button>
              </>
            ) : (
              <ButtonUpload
                onFileUpload={(files) => {
                  console.log(files);
                  // trigger the upload api
                  if (files && files[0]) {
                    handleImageUpload(files);
                  }
                }}
              />
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddNewProduct;
