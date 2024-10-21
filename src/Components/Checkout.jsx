import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { auth, signInWithGoogle } from "../utils/firebase"; 

const CheckOutModal = ({ isModalOpen, handleOk, checkoutOrder, handleCancel }) => {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });

  const isLogin = auth.currentUser;

  useEffect(() => {
    if (isLogin) {
      const currentUser = auth.currentUser;
      setUserDetails({
        username: currentUser.displayName || "",
        email: currentUser.email || "",
      });
    } else {
      setContinueAsGuest(false);
      setUserDetails({ username: "", email: "" });
    }
  }, [isLogin]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserDetails({
        username: currentUser.displayName || "",
        email: currentUser.email || "",
      });
    }
  };

  const handleCheckout = (values) => {
    const orderData = {
      ...values,
      user: isLogin ? auth.currentUser.uid : userDetails.email, // Save user UID in the 'user' field
      username: isLogin ? auth.currentUser.displayName : userDetails.username,
    };
    checkoutOrder(orderData);
  };

  return (
    <Modal
      title={<h1 className="text-black font-bold font-serif text-center text-3xl">Checkout</h1>}
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={null}
      onCancel={handleCancel}
      className="custom-modal"
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      {!isLogin && !continueAsGuest && (
        <div className="flex flex-col items-center text-white">
          <h1 className="text-center my-5 font-serif text-teal-400">
            Login to Save your Orders and See Progress
          </h1>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-teal-500 hover:bg-teal-600 font-serif text-black font-semibold px-6 py-2 rounded-lg"
          >
            Continue with Google
          </button>
          <h1 className="text-center my-5 font-serif text-white">----- OR -----</h1>
          <button
            onClick={() => setContinueAsGuest(true)}
            className="bg-teal-500 hover:bg-teal-600 font-serif text-black font-semibold px-6 py-2 rounded-lg"
          >
            Continue as a Guest
          </button>
        </div>
      )}

      {(isLogin || continueAsGuest) && (
        <Form onFinish={handleCheckout} layout="vertical" className="custom-form">
          <Form.Item
            name={"username"}
            label={<span className="text-teal-400 font-serif">Username</span>}
          >
            <Input
              className="bg-black text-white border-teal-500"
              placeholder="Enter your username"
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              required
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            label={<span className="text-teal-400 font-serif">Email</span>}
          >
            <Input
              className="bg-black text-white border-teal-500"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
          </Form.Item>
          <Form.Item
            name={"address"}
            label={<span className="text-teal-400 font-serif">Address</span>}
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input.TextArea
              className="bg-black text-white border-teal-500"
              placeholder="Enter your address"
              required
            />
          </Form.Item>
          <Form.Item
            name={"number"}
            label={<span className="text-teal-400 font-serif">Phone Number</span>}
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input
              className="bg-black text-white border-teal-500"
              placeholder="Enter your phone number"
              required
            />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="bg-teal-500 font-serif hover:bg-teal-600 text-black font-semibold px-6 py-2 rounded-lg"
            >
              Checkout
            </button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CheckOutModal;
