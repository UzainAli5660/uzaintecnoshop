// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/auth/Signup";  
import Signin from "./pages/auth/Signin";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/Dashboard";
import Carts from "./pages/Carts";
import Admin from "./pages/Admin";
import AdProducts from "./pages/AdProducts";
import AdOrders from "./pages/AdOrders";
import AdUsers from "./pages/AdUsers";
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route index element={<Auth />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="Signin" element={<Signin />} />
        </Route>

        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route 
            path="/Admin"  
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/Carts" element={<Carts />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Admin/Products" element={<ProtectedRoute><AdProducts /></ProtectedRoute>} />
          <Route path="/Admin/Orders" element={<ProtectedRoute><AdOrders /></ProtectedRoute>} />
          <Route path="/Admin/Users" element={<ProtectedRoute><AdUsers /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
