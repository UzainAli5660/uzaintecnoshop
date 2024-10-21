import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";


function Dashboard() {
    return (
      <div>
        <Header />
  
        <Outlet />
  
        <Footer />
      </div>
    );
  }
  
  export default Dashboard;