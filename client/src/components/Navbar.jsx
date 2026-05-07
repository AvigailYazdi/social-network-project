import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, user, logout, openAuthDialog } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-logo">Social Network</div>
      <nav className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/feed">Feed</Link>
            <Link to="/profile">My Profile</Link>
            <span>Hello {user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => openAuthDialog("login")}>Login</button>
            <button onClick={() => openAuthDialog("register")}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
};
