import { Container, Typography, TextField, Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "sonner";
import {
  editProducts,
  getProduct,
  getUserToken,
  getCategory,
} from "../../utility/api";
import { useCookies } from "react-cookie";
import ButtonUpload from "../../components/ButtonUpload";
import { uploadImage } from "../../utility/api_image";
const API_URL = "http://localhost:5555";

function EditProduct() {
  const { id } = useParams();
  const [cookies] = useCookies(["currentUser"]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const token = getUserToken(cookies);

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
    });
  }, [id]);

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]);
    setImage(image_url);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }
    // trigger the API
    const updatedProduct = await editProducts(
      id,
      name,
      description,
      price,
      category,
      image,
      token
    );

    if (updatedProduct) {
      toast.success("Product has been edited successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <Header label="Edit" />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Product
            </Typography>
          </CardContent>
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
              required
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
          {/* text box */}
          {/* <Box mb={2}>
            <TextField
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </Box> */}
          {/* text box */}
          <Box>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Update
          </Button>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" ml={2}>
          Loading...
        </Typography>
      </Backdrop>
    </>
  );
}

export default EditProduct;
