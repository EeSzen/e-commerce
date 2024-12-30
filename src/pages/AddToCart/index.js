import { useNavigate } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container } from "@mui/material";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import Header from "../../components/Header";

function AddToCart() {
  const navigate = useNavigate();

  //   localstorage
  const stringProducts = localStorage.getItem("products");
  // convert the string version of posts into array
  let products = JSON.parse(stringProducts);

  // if products is not found, set it as empty array
  if (!products) {
    products = [];
  }

  // Calculate the total price of all items in the cart
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  // start from 0

  const handleCartDelete = (product_id) => {
    // 1. remove the selected post from posts based on the post_id
    let filteredProducts = products.filter(
      (product) => product._id !== product_id
    );
    // 2. update the data back to the local storage using thelocalStorage.setItem()
    let convertedProducts = JSON.stringify(filteredProducts);

    localStorage.setItem("products", convertedProducts);
    // 3. redirect back to /addtocart
    navigate("/products/cart");
  };

  return (
    <Container>
      <Header label="Cart" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Product
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                  maxWidth: "2px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow
                  key="hi"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="center">&nbsp;${product.price}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="right">
                    {" "}
                    ${(product.price * product.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete this product from your cart ?"
                        );
                        if (confirm) {
                          toast.success("Product deleted successfully");
                          handleCartDelete(product._id);
                        } else {
                          toast.error("Failed to delete product");
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <h1>Cart is Empty =( </h1>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell
                colSpan={4}
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                ${totalPrice.toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  LinkComponent={Link}
                  to="/checkout"
                  sx={{ textTransform: "none" }}
                  disabled={products.length === 0 ? true : false}
                >
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AddToCart;
