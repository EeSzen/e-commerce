import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import { Button } from "@mui/material";

function Header(props) {
  const { label = "Welcome To My Store!" } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/products/cart";

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
          justifyContent: "center",
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
          disabled={isCartPage}
          // Disable if we're already on the homepage
          onClick={() => {
            navigate("/products/cart");
          }}
        >
          Cart
        </Button>
      </Container>
    </Box>
  );
}

export default Header;
