import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

function GameCard(props) {
  const { item, onDelete } = props;
  const { _id, name, price, description, category } = item;
  const navigate = useNavigate();

  const handleCartAdd = (event) => {
    event.preventDefault();
    // localstorage
    const stringProducts = localStorage.getItem("products");
    // convert the string version of Products into array
    let products = JSON.parse(stringProducts);

    // if Products is not found, set it as empty array
    if (!products) {
      products = [];
    }

    const existingProduct = products.find((product) => product._id === _id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      // existingProduct.quantity = existingProduct.quantity + 1;
    } else {
      products.push({
        _id: _id,
        name: name,
        price: price,
        description: description,
        category: category,
        quantity: 1,
      });
    }

    let convertedProducts = JSON.stringify(products);

    localStorage.setItem("products", convertedProducts);
    // 3. redirect back to /addtocart
    navigate("/products/cart");
  };

  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Box
          sx={{
            color: "text.secondary",
            mb: 1.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Chip
            label={"$" + price}
            size="small"
            color="success"
            variant="outlined"
            sx={{ backgroundColor: "lightcyan" }}
          />
          <Chip
            label={category}
            size="small"
            color="error"
            variant="outlined"
            sx={{ backgroundColor: "lightpink" }}
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleCartAdd}>
          Add To Cart
        </Button>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 10",
        }}
      >
        <Button
          variant="contained"
          size="small"
          LinkComponent={Link}
          to={`/products/${item._id}/edit`}
          sx={{ borderRadius: 30, ml: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ borderRadius: 30, mr: 1 }}
          onClick={() => {
            onDelete(_id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
