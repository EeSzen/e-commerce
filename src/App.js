import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AddNewProduct from "./pages/AddNewProduct";
import EditProduct from "./pages/EditProduct";
import AddToCart from "./pages/AddToCart";
import { Toaster } from "sonner";

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
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default App;
