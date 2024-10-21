import React, { useEffect, useState, useContext } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Card, Col, Row, message, Spin } from 'antd';
import { AuthContext } from '../context/AuthContext';

function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user.isLogin) {
        message.error("You must be logged in to view your orders.");
        return;
      }

      const ordersCollection = collection(db, 'orders');
      const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
        const orderList = snapshot.docs
          .filter(doc => doc.data().user === user.userInfo.uid) // Filter by user UID
          .map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Fetched Orders:", orderList);

        if (orderList.length === 0) {
          message.info("No orders found for this user.");
        }

        setOrders(orderList);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching orders:", error);
        message.error("Error fetching orders.");
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    };

    fetchOrders();
  }, [user]);

  const parseItemString = (itemString) => {
    const match = itemString.match(/Item: (.*), Price: (.*) \((\d+)\)/);
    if (match) {
      return {
        title: match[1],
        price: match[2],
        quantity: match[3],
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header with user's email */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
  <h1 className="text-3xl sm:text-4xl font-bold text-teal-500 font-serif text-center">Your Orders</h1>
  {user.isLogin && (
    <p className="text-teal-400 font-serif font-semibold text-sm sm:text-base text-center sm:text-right">
      Logged in as: {user.userInfo.email}
    </p>
  )}
</div>


      <Row gutter={[16, 16]}>
        {orders.length > 0 ? (
          orders.map((order) => {
            const itemsDetails = order.items.map(parseItemString).filter(item => item);
            const statusClass = order.status === 'pending'
              ? 'bg-red-200 border-2 border-black'
              : 'bg-green-200 border-2 border-black';
            const cardClass = `bg-black font-serif border-teal-500 text-black p-4 rounded-lg hover:border-black transition duration-300`;

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={order.id}>
                <Card className={`${cardClass} ${statusClass}`} hoverable>
                  <h2 className="font-bold  text-black mt-2 text-center">Order ID: {order.id}</h2>
                  <hr style={{ borderTop: '2px solid black' }} />
                  {itemsDetails.map((item, index) => (
                    <div key={index} className="text-black mb-2">
                      <p className="font-bold"><span className='text-xl'>{item.title} </span><br /> - Price: ${item.price} (Qty: {item.quantity})</p>
                    </div>
                  ))}
                  <p className="font-bold text-black">Total Price: ${order.totalPrice}</p>
                  <p className={`font-bold font-serif text-black rounded border-2 ${statusClass} p-1 text-center`}>Status: {order.status}</p>
                  <p className="font-bold font-serif text-black">Address: {order.address}</p>
                  <p className="font-bold font-serif text-black">Phone Number: {order.number}</p>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col span={24}>
            <h2 className="text-center font-serif text-teal-400">No orders found.</h2>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Orders;
