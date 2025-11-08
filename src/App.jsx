import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/products/:postId" element={<Products />} />
        <Route path="/product/:postId" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
