// src/Pages/Admin.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Admin() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      setTotalOrders(ordersSnapshot.size);
    };

    const fetchUsers = async () => {
      const usersQuery = query(
        collection(db, "users"),
        where("email", "!=", "admin@tecnoshop.com")
      );
      const usersSnapshot = await getDocs(usersQuery);
      setTotalUsers(usersSnapshot.size);
    };

    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <>
      <div className="admin-dashboard flex flex-col lg:flex-row">
        <div className="admin-content w-full p-8 bg-black">
          {/* Profile Section */}
          <div className="profile mb-8 p-4 border-2 border-teal-400 text-center shadow-md rounded-lg w-full bg-black">
  <h2 className="text-xl font-serif sm:text-2xl font-bold mb-2 text-teal-400 underline">Admin Profile</h2>
  <p className="text-teal-400 text-sm sm:text-base">
    Admin Name: <span className="font-semibold block font-serif sm:inline m-3">Uzain Ali</span>
  </p>
  <p className="text-teal-400 font-serif text-sm sm:text-base">
    Email: <span className="font-semibold block font-serif sm:inline m-3">admin@tecnoshop.com</span>
  </p>
</div>


          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
            <Link
              to="/Admin/Products"
              className="bg-teal-400 p-6 shadow-md rounded-lg w-full hover:bg-black hover:text-teal-400 transition-all duration-300"
            >
              <h3 className="text-xl font-bold font-serif">Products</h3>
              <p className="font-semibold font-serif">Total Products: <span className="font-bold text-xl">51</span></p>
            </Link>

            <Link
              to="/Admin/Orders"
              className="bg-teal-400 p-6 shadow-md rounded-lg w-full hover:bg-black hover:text-teal-400 transition-all duration-300"
            >
              <h3 className="text-xl font-bold font-serif">Orders</h3>
              <p className="font-semibold">Total Orders: <span className="font-bold text-xl">{totalOrders}</span></p>
            </Link>

            <Link
              to="/Admin/Users"
              className="bg-teal-400 p-6 shadow-md rounded-lg w-full hover:bg-black hover:text-teal-400 transition-all duration-300"
            >
              <h3 className="text-xl font-bold font-serif">Users</h3>
              <p className="font-semibold">Total Users: <span className="font-bold text-xl">{totalUsers}</span></p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
