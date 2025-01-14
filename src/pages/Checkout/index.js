import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { toast } from "sonner";
import {
  createOrder,
  validateEmail,
  getUserToken,
  getCurrentUser,
  isUserLoggedIn,
} from "../../utility/api";
import { useCookies } from "react-cookie";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const currentUser = getCurrentUser(cookies);
  const [name, setName] = useState(
    currentUser && currentUser.name ? currentUser.name : ""
  );
  const [email, setEmail] = useState(
    currentUser && currentUser.email ? currentUser.email : ""
  );
  const [loading, setLoading] = useState(false);

  //   localstorage
  const stringProducts = localStorage.getItem("cart")
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

  // const cart = getCart();
  // const totalPrice = getTotalCartPrice();

  useEffect(() => {
    if (!isUserLoggedIn(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const doCheckout = async () => {
    // 1. make sure the name and email fields are filled
    if (name === "" || email === "") {
      toast.error("Please fill up all the fields");
    } else if (!validateEmail(email)) {
      // check if is a valid email
      toast.error("Please insert a valid email address");
    } else {
      // show loader
      setLoading(true);
      // 2. trigger the createOrder function
      const response = await createOrder(
        name,
        email,
        products,
        totalPrice,
        token
      );
      console.log(products);
      // 3. get the billplz url from response
      const billplz_url = response.billplz_url;
      // 4. redirect the user to billplz payment page
      window.location.href = billplz_url;
    }
  };

  return (
    <Container>
      <Header />
      <Grid container spacing={4} sx={{ width: "100%", display: "flex" }}>
        {/* Contact Info */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <Box>
            <Typography variant="h6" gutterBottom display>
              Contact Information
            </Typography>

            {/* input field */}
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
                label="Email"
                required
                fullWidth
                value={email}
                // disabled to prevent changing through inspect
                // onChange={(event) => setEmail(event.target.value)}
                disabled={true}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              sx={{ textTransform: "none" }}
              onClick={() => doCheckout()}
            >
              Pay ${totalPrice.toFixed(2)} Now
            </Button>
          </Box>
        </Grid>
        {/* End Contact Info */}

        {/* Order Summary */}
        <Grid item size={{ xs: 12, md: 6, lg: 6 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom display>
              Your Order Summary
            </Typography>
            <Table>
              <TableBody>
                {products.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Total:</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ${totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        {/* End Order Summary */}
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" ml={2}>
          Loading...
        </Typography>
      </Backdrop>
    </Container>
  );
}

export default Checkout;
