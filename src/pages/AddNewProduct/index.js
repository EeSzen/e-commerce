import { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { toast } from "sonner";

function AddNewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    //trigger the api
  };

  return (
    <Container>
      <Header />
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
            <TextField
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
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
