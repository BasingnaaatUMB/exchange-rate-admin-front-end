import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="App">
        <Navbar></Navbar>
        <Outlet />
    </div>
  )
}

export default Layout