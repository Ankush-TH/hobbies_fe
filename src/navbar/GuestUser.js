import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/LoginPage";

function GuestUser() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default GuestUser;
