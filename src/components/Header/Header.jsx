import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import styles from "./Header.module.css";
import Logo from "../../assets/images/Logo.png";
import { FiMenu } from "react-icons/fi"; // Menu icon

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/users/login");
  };

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo" className={styles.logoImage} />
        </div>
      </Link>

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu size={24} />
      </button>

      <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link
              to="/"
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/how-it-works"
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
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
              <Link
                to="/users/login"
                className={styles.link}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
