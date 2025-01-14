import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserToken, getOneCategory, getCategory , isAdmin } from "../../utility/api";
import { toast } from "sonner";
import Header from "../../components/Header";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { updateCategory } from "../../utility/api_category";

function CategoryEdit() {
  const { _id } = useParams();
  const navigate = useNavigate("/");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [cookies] = useCookies(["currentUser"]);
  const token = getUserToken(cookies);

  useEffect(() => {
    getOneCategory(_id).then((data) => {
      setName(data.name);
      setCategories(data);
    });
  }, [_id]);

  useEffect(() => {
    getCategory().then((data) => {
      setCategories(data);
    });
  }, []);

  // check if is admin or not
  useEffect(() => {
    if (!isAdmin(cookies)) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("Please fill out all the required fields");
    }
    // trigger the API
    const updatedCategory = await updateCategory(_id, name, token);

    if (updatedCategory) {
      toast.success("Category has been edited successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <Header label="Edit Category" />
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 2 }}>
              Edit
            </Typography>
            <TextField
              label="Category Name"
              required
              fullWidth
              sx={{ marginBottom: "10px" }}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleFormSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default CategoryEdit;
