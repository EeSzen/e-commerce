import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import {
  getUserToken,
  isAdmin,
  getProducts,
  getCategory,
  deleteProducts,
} from "../../utility/api";

import Header from "../../components/Header";
import GameCard from "../../components/Card";
import Container from "@mui/material/Container";

import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Home() {
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("all");

  //   // first load
  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  // if data, set it in the menu list
  useEffect(() => {
    getProducts(category, page).then((listData) => {
      setList(listData);
      console.log(listData);
    });
  }, [category, page]);

  console.log(list);

  const handleChange = (event) => {
    setCategory(event.target.value);
    // reset the page back to page 1
    setPage(1);
  };

  const handleDelete = async (id, token) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProducts(id, token);
      if (deleted) {
        // get the latest products data from the API again
        const latestProducts = await getProducts(category, page);
        // update the products state with the latest data
        setList(latestProducts);
        // show success message
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Header />
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
          {isAdmin(cookies) ? (
            <Button
              LinkComponent={Link}
              to="/products/new"
              variant="contained"
              color="success"
            >
              Add New
            </Button>
          ) : null}
        </div>
        <>
          {/* /////////////////////////////// */}
          {/* <Dropdown onChange={handleChange} list={list} /> */}
          {/* /////////////////////////////// */}
          <Box sx={{ marginBottom: "20px" }}>
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
                  <MenuItem value={item._id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* /////////////////////////////// */}
        </>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container marginTop={1} >
            {list.length > 0 ? (
              list.map((item) => (
                <Grid key={item._id} xs={12} md={6} lg={4} >
                  <GameCard
                    item={item}
                    onDelete={() => handleDelete(item._id, token)}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={12}>
                <Box>
                  <Typography
                    sx={{
                      display: "flex",
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    No product found.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "20px 0 40px 0",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft />
            Prev
          </Button>
          <span>Page {page}</span>
          <Button
            variant="contained"
            color="secondary"
            disabled={list.length === 0 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
