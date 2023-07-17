import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from "./components/AuthUser";
import Auth from "./navbar/Auth";
import GuestUser from "./navbar/GuestUser";

function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return <GuestUser />;
  }
  return <Auth />;
}

export default App;
