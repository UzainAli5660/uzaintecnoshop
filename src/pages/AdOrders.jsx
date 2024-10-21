import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Adjust the path to your Firebase config
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function AdOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter(order => order.id !== orderId));
      console.log(`Order ${orderId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'; // Toggle status

    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      console.log(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="ad-orders p-8 bg-black">
       <div className="flex items-center justify-center  mb-4">
      <Link to="/admin" className="mr-2">
        <ArrowLeftOutlined style={{ fontSize: "24px", color: "white" }} />
      </Link>
      <h2 className="text-2xl font-bold font-serif text-teal-400 text-center underline">
        Manage Orders
      </h2>
    </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black text-teal-400 shadow-md rounded-lg">
          <thead>
            <tr className="bg-teal-400 text-black">
              <th className="py-2 px-4 font-serif">Order ID</th>
              <th className="py-2 px-4 font-serif">Items</th>
              <th className="py-2 px-4 font-serif">Quantity</th>
              <th className="py-2 px-4 font-serif">Email</th>
              <th className="py-2 px-4 font-serif">Phone Number</th>
              <th className="py-2 px-4 font-serif">Address</th>
              <th className="py-2 px-4 font-serif">Status</th>
              <th className="py-2 px-4 font-serif">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id} className="border border-teal-400 text-center">
                  <td className="py-2 px-4 font-semibold text-white ">{order.id}</td>
                  <td className="py-2 px-4 font-semibold ">{order.items.join(', ')}</td> {/* Assuming items is an array */}
                  <td className="py-2 px-4 font-semibold text-white">{order.totalPrice}</td>
                  <td className="py-2 px-4">{order.email}</td>
                  <td className="py-2 px-4 font-semibold text-white" >{order.number}</td>
                  <td className="py-2 px-4">{order.address}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => updateOrderStatus(order.id, order.status)}
                      className={`text-white px-2 py-1 rounded ${
                        order.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    >
                      {order.status}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="ml-auto  text-teal-300 bg-black border-teal-300 hover:bg-teal-600 border-2 py-2 px-4 focus:outline-none rounded-lg transition-all font-serif font-semibold duration-300"                    >
                    
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 px-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdOrders;
