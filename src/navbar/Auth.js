import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import AuthUser from "../components/AuthUser";
import AddHobby from "../components/AddHobby";

function Auth() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
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
            <Link className="nav-link text-light" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <span
              role="button"
              className="nav-link text-light"
              onClick={logoutUser}
            >
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addHobby" element={<AddHobby />} />
        </Routes>
      </div>
    </div>
  );
}

export default Auth;
