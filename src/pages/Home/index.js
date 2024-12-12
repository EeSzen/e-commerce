import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import Dropdown from "../../components/Dropdown";
import GameCard from "../../components/Card";
import Container from "@mui/material/Container";

import { getProducts, getCategory } from "../../utility/api";

function Home() {
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");

  //   // first load
  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  // if data, set it in the menu list
  useEffect(() => {
    getProducts(category).then((listData) => {
      setList(listData);
      console.log(listData);
    });
  }, [category]);

  console.log(list);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: "flex",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          WELCOME TO MY STORE
        </Typography>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <Button variant="contained" color="success" size="sm">
            Add New
          </Button>
        </div>
        <div>
          {/* /////////////////////////////// */}
          {/* <Dropdown onChange={handleChange} list={list} /> */}
          {/* /////////////////////////////// */}
          <div>
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
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* /////////////////////////////// */}
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {list.map((item) => (
              <Grid key={item._id} xs={12} md={6} lg={4}>
                <GameCard item={item} />
              </Grid>
            ))}
            {/* {list.forEach((item) => {
              console.log(item._id)
              return (
              <Grid key={item._id} xs={12} md={4} >
                <GameCard item={item} />
              </Grid>
            )})} */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
