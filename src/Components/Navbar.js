import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useLogout from "./hooks/useLogout";

function Navbar(){
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async() => {
    await logout();
    navigate('/');
  }

    return(
        <nav className="navbar bg-dark navbar-expand-lg navbar-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand app-title" to="/">UMB Rate Board App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              {auth?.user && <li className="nav-item">
                <Link className="nav-link" to="/addrate">Add Rates</Link>
              </li>}
              {auth?.user && <li className="nav-item">
                <Link className="nav-link" to="/images">Images</Link>
              </li>}
              {auth?.user && <button onClick={handleLogout} className="logoutButton">Logout</button>}
              {!auth?.user && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>  
    )
}

export default Navbar;