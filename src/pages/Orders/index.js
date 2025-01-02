import { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import Header from "../../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { deleteOrder, getOrders, updateOrder } from "../../utility/api";

function Orders() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getOrders().then((data) => {
      setOrder(data);
    });
  }, []);

  const handleDeleteOrder = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmed) {
      const deleted = await deleteOrder(_id);
      if (deleted) {
        // get the latest products data from the API again
        const latestOrders = await getOrders();
        console.log(latestOrders);
        // update the products state with the latest data
        setOrder(latestOrders);
        // show success message
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete order");
      }
    }
  };

  const handleStatusChange = async (_id, status) => {
    // try {
    //   const updatedOrder = await updateOrder(_id, newStatus);
    //   if (updatedOrder) {
    //     // Update the order in the state with the new status
    //     setOrder((prevOrders) =>
    //       prevOrders.map((order) =>
    //         order._id === _id ? { ...order, status: newStatus } : order
    //       )
    //     );
    //     toast.success("Order status updated successfully");
    //     console.log(handleStatusChange)
    //   }
    // } catch (error) {
    //   toast.error("Failed to update order status");
    // }
    const updatedOrder = await updateOrder(_id, status);
    if (updatedOrder) {
      // fetch the updated orders from API
      const updatedOrders = await getOrders();
      setOrder(updatedOrders);
      toast.success("Order status has been updated");
    }
  };

  return (
    <Container>
      <Header label="My Orders" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Products
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Total Amount
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Payment Date
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((item) => (
              <TableRow
                key={item.customerName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="products">
                  <div>{item.customerName}</div>
                  <div>({item.customerEmail})</div>
                </TableCell>
                <TableCell align="right">
                  {item.products.map((a) => (
                    <div key={a._id}>{a.name}</div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  ${item.totalPrice.toFixed(2)}
                </TableCell>
                {/* ======= dropdown ====== */}
                <TableCell align="right">
                  <FormControl>
                    {item.status === "pending" ? (
                      <Select value={item.status} disabled={true}>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    ) : (
                      <Select
                        value={item.status}
                        onChange={(event) => {
                          handleStatusChange(item._id, event.target.value);
                        }}
                      >
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </TableCell>
                {/* ====================== */}
                <TableCell align="right">{item.paid_at}</TableCell>
                <TableCell align="right">
                  {item.status === "failed" || item.status === "pending" ? (
                    <Button
                      variant="contained"
                      color="error"
                      // LinkComponent={Link}
                      // to="/checkout"
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        handleDeleteOrder(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Orders;
