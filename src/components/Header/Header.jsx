import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../assets/images/Logo.png";
import { UserContext } from "../../context/UserProvider";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); // Get user state from context

  // Log out functionality
  const handleLogOut = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setUser(null); // Clear user context
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" className={styles.logoImage} />
      </div>

      {/* Right section with navigation links */}
      <div className={styles.navLinks}>
        <ul>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className={styles.link}>
              How It Works
            </Link>
          </li>

          {user ? (
            <li>
              <button onClick={handleLogOut} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/register" className={styles.link}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
