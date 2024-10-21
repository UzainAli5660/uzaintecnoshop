import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
const Auth = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
      <Link to="/admin" className="mr-2">
        <ArrowLeftOutlined style={{ fontSize: "24px", color: "white" }} />
      </Link>
        <h2 className="text-3xl font-bold text-center font-serif text-teal-400">Authentication</h2>
        
        <div className="mt-8 space-y-4">
        <Link to="/auth/Signin">
        <button className="w-full font-serif px-4 py-2 text-lg font-medium text-black bg-teal-400 rounded-lg hover:bg-teal-500 transition duration-300">
            Login
          </button>
   </Link>

          <div className="text-center font-serif text-white">
            <p>Don't have an account?</p>
            <Link to="/auth/Signup">
            <button className="mt-2 font-serif text-teal-400 hover:underline">
              Create Account
            </button>
            </Link>            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
