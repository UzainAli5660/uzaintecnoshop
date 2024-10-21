import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd"; // Import Ant Design components
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"; // Ant Design icons

const SignUp = () => {
  const { handleSignup, handleGoogleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add a username state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for button loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    try {
      await handleSignup(email, password, username);
      navigate("/auth/signin"); // Redirect after successful signup
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      if (error.code === "auth/email-already-in-use") {
        message.error("Email is already in use. Please try another."); // Show Ant Design error message
      } else {
        message.error("Signup error: " + error.message);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await handleGoogleLogin();
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.error("Google login error:", error.message);
      message.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black border-2 border-teal-400 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold font-serif text-teal-500 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-serif text-teal-500 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-serif text-teal-500 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-serif text-teal-500 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="primary"
            htmlType="submit"
            className="w-full font-serif font-semibold p-2 text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 mb-4 hover:text-black transition duration-300"
            loading={loading} // Show loading indicator when signing up
          >
            Sign Up
          </button>
          <button
            type="default"
             className="w-full font-serif font-semibold p-2 text-teal-400 border-2 border-teal-500 bg-black hover:bg-teal-500 hover:text-black transition duration-300"
            onClick={handleGoogle}
  
          >
            Sign Up with Google
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/auth/Signin" className="text-sm font-serif text-teal-400 hover:text-teal-600 transition">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
