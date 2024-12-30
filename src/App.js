import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import AddNewProduct from "./pages/AddNewProduct";
import EditProduct from "./pages/EditProduct";
import AddToCart from "./pages/AddToCart";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/new" element={<AddNewProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/cart" element={<AddToCart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify-payment" element={<PaymentVerify />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;