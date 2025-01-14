import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { toast } from "sonner";
import {
  Box,
  Container,
  Typography,
  TextField,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Table,
  Button,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { addNewCategory, deleteCategory } from "../../utility/api_category";
import { getCategory, getUserToken } from "../../utility/api";
import { isAdmin } from "../../utility/api";

function Categories() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate("/");
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleDelete = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const deleted = await deleteCategory(_id, token);
      if (deleted) {
        // get the latest Category data from the API again
        const latestCategory = await getCategory(category);
        // update the Category state with the latest data
        setCategories(latestCategory);
        console.log(latestCategory);
        // show success message
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //check for error
    if (!name) {
      toast.error("Please fill out all the required fields");
    }

    //trigger the add new category API
    const newCategory = await addNewCategory(name, token);

    // check if the newCategory exist or not
    if (newCategory) {
      // show success error
      toast.success("Category has been added successfully");
      navigate("/");
    }
  };

  return (
    <Container>
      <Header label="Categories Page" />
      <Typography variant="h4" mb={2}>
        Categories
      </Typography>
      <Box
        sx={{
          padding: "20px ",
          border: "0.5px solid #000",
          marginBottom: "25px",
          display: "flex",
        }}
      >
        <>
          <TextField
            label="Category Name"
            required
            fullWidth
            value={name}
            onChange={handleChange}
          />
        </>
        <>
          <Button
            variant="contained"
            size="large"
            sx={{ ml: 2 }}
            onClick={handleFormSubmit}
          >
            Add
          </Button>
        </>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((item) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigate(`/categories/${item._id}/edit`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(item._id, token)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Categories Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default Categories;
