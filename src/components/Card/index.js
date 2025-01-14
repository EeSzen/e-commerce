import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { isAdmin, isUserLoggedIn } from "../../utility/api";

const API_URL = "http://localhost:5555";

function GameCard(props) {
  const [cookies] = useCookies(["currentUser"]);
  const { item, onDelete } = props;
  const { _id, name, price, description, category } = item;
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (isUserLoggedIn(cookies)) {
      // trigger add to cart function
      // event.preventDefault();

      // const handleCartAdd = (event) => {
      // localstorage
      const stringProducts = localStorage.getItem("cart");
      // convert the string version of Products into array
      let products = JSON.parse(stringProducts);

      // if Products is not found, set it as empty array
      if (!products) {
        products = [];
      }

      const existingProduct = products.find((product) => product._id === _id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        toast.success(`${product.name} has been added to Cart`);
        // existingProduct.quantity = existingProduct.quantity + 1;
      } else {
        toast.success("Product added successfully");
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

      localStorage.setItem("cart", convertedProducts);
      // 3. redirect back to /addtocart
      // navigate("/products/cart");
      // };
    } else {
      // redirect user to login page if not logged in
      navigate("/login");
      toast.info("Please login first");
    }
  };

  return (
    <Card sx={{ minWidth: 200 }}>
      {item.image !== "" ? (
        <CardMedia
          component="img"
          image={`${API_URL}/${item.image}`}
          sx={{ maxHeight: "200px", minHeight: "200px" }}
        />
      ) : null}
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
            label={category && category.name ? category.name : ""}
            size="small"
            color="error"
            variant="outlined"
            sx={{ backgroundColor: "lightpink" }}
          />
        </Box>
        <Button variant="contained" fullWidth onClick={handleAddToCart}>
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
        {isAdmin(cookies) ? (
          <>
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
          </>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default GameCard;
