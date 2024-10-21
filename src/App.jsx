// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import SignUp from "./Pages/auth/SignUp";  
import Signin from "./Pages/auth/Signin";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Orders from "./Pages/Orders";
import Auth from "./Pages/auth/Auth";
import Dashboard from "./Pages/Dashboard";
import Carts from "./Pages/Carts";
import Admin from "./Pages/Admin";
import AdProducts from "./Pages/AdProducts";
import AdOrders from "./Pages/AdOrders";
import AdUsers from "./Pages/AdUsers";
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
