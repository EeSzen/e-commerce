import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { isUserLoggedIn } from "../../utility/api";
import {
  clearCart,
  getUserToken,
  isAdmin,
  getUserName,
} from "../../utility/api";

function Header(props) {
  const { label = "Welcome To My Store!" } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentUser"]);
  const currentUserName = getUserName(cookies);

  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/products/cart";
  const isOrdersPage = location.pathname === "/orders";
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isCategoriesPage = location.pathname === "/categories";

  // console.log(cookies.currentUser.email);

  const handleLogOut = () => {
    // clear the cookies
    removeCookie("currentUser");
    // clear cart on logout
    clearCart();
    // redirect the user back to login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
      <Container
        sx={{
          display: "flex",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          disabled={isHomePage}
          // Disable if we're already on the homepage
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          disabled={isCartPage}
          // Disable if we're already on the homepage
          onClick={() => {
            navigate("/products/cart");
          }}
        >
          Cart
        </Button>
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          disabled={isOrdersPage}
          // Disable if we're already on the homepage
          onClick={() => {
            navigate("/orders");
          }}
        >
          Orders
        </Button>
        {isAdmin(cookies) ? (
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            disabled={isCategoriesPage}
            // Disable if we're already on the homepage
            onClick={() => {
              navigate("/categories");
            }}
          >
            Categories
          </Button>
        ) : null}

        <Container
          sx={{
            display: "flex",
            fontWeight: "bold",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          {isUserLoggedIn(cookies) ? (
            <>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                Current User: {currentUserName}
              </Typography>
              <Button
                // variant={"contained"}
                // color="error"
                sx={{
                  padding: "10px 20px",
                }}
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                Current User: Guest
              </Typography>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                disabled={isLoginPage}
                // Disable if we're already on the homepage
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                disabled={isSignupPage}
                // Disable if we're already on the homepage
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Container>
      </Container>
    </Box>
  );
}

export default Header;
