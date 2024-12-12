import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";


// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

function GameCard(props) {
  const { item } = props;
  const { _id, name, price, description, category } = item;

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
        <Button variant="contained" fullWidth>
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
          sx={{ borderRadius: 30, ml: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          sx={{ borderRadius: 30, mr: 1 }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
