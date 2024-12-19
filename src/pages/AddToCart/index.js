import { useNavigate } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

import Header from "../../components/Header";

function AddToCart(props) {
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
    <>
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
                          handleCartDelete(product._id);
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
                <Button variant="contained">Checkout</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddToCart;

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
