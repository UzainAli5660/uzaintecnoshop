import { useState, useContext } from "react";
import { Avatar, Badge, Button, Image } from "antd";
import { UserOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { cartItems } = useContext(CartContext);
  const { user, handleLogout, isAdmin } = useContext(AuthContext); // Import isAdmin
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex justify-center w-full sm:w-auto">
          <Link to={"/"}>
            <Image height={100} width={200} preview={false} src="/logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseOutlined style={{ fontSize: 40, color: "teal" }} />
            ) : (
              <MenuOutlined style={{ fontSize: 30, color: "teal" }} />
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <Link to={"/"} className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">Home</Link>
          <Link to={"/Products"} className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">Shop</Link>
          <Link to={"/Orders"} className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">Orders</Link>

          {/* Show Admin link if the user is an admin */}
          {isAdmin() && (
            <Link to="/Admin" className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">Admin</Link>
          )}

          {user.isLogin ? (
            <div className="flex items-center">
              <Avatar size={40} src={user.userInfo.photoUrl} icon={!user.userInfo.photoUrl && <UserOutlined style={{ fontSize: 30, color: "teal" }} />} />
              <button 
                onClick={handleLogout} 
                className="ml-2 text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/Auth"}>
              <button className="text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">Login</button>
            </Link>
          )}

          <Link to="/Carts">
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined style={{ fontSize: 40, color: "teal" }} />
            </Badge>
          </Link>
        </div>

        {/* Sliding menu for small screens */}
        <div className={`fixed top-0 left-0 h-full bg-teal-100 shadow-lg z-10 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out w-64 p-6`}>
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
            <CloseOutlined style={{ fontSize: 30, color: "teal" }} />
          </button>
          <div className="flex flex-col items-center mt-12 space-y-6">
            <Link to="/" className="text-lg font-bold text-teal-600 hover:text-teal-800" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/Products" className="text-lg font-bold text-teal-600 hover:text-teal-800" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/Orders" className="text-lg font-bold text-teal-600 hover:text-teal-800" onClick={() => setMenuOpen(false)}>Orders</Link>

            {/* Show Admin link if the user is an admin */}
            {isAdmin() && (
              <Link to="/Admin" className="text-lg font-bold text-teal-600 hover:text-teal-800" onClick={() => setMenuOpen(false)}>Admin</Link>
            )}

            {user.isLogin ? (
              <div className="flex items-center">
                <Avatar size={40} src={user.userInfo.photoUrl} icon={!user.userInfo.photoUrl && <UserOutlined style={{ fontSize: 30, color: "teal" }} />} />
                <button 
                  onClick={handleLogout} 
                  className="ml-2 text-lg font-bold text-teal-600 hover:text-teal-800 transition-colors duration-300">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/Auth" onClick={() => setMenuOpen(false)}>
                <Button className="text-teal-600 border-teal-600 hover:bg-teal-600 hover:text-black" type="default">Login</Button>
              </Link>
            )}

            <Link to="/Carts">
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined style={{ fontSize: 30, color: "teal" }} />
              </Badge>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
