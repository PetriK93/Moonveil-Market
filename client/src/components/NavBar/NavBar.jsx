import { Link, useNavigate, useLocation } from "react-router-dom";
import brandLogo from "../../assets/brand_logo_1.png";
import styles from "./NavBarStyles.module.css";

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/log-in";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // If using cookies, clear them with an API call to the backend
      await fetch("http://localhost:3000/api/auth/log-out", {
        method: "POST",
        credentials: "include",
      });

      // Redirect to the login page
      navigate("/log-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <nav id="navbar">
          <div
            className={`${styles.imageWrapper} ${
              isLoginPage ? styles.imageWrapperLogin : styles.imageWrapperLogout
            }`}
          >
            <img
              className={
                isLoginPage ? styles.navBarLogoLogin : styles.navBarLogoLogout
              }
              src={brandLogo}
              alt="Brand logo"
            />
          </div>
          <ul>
            {!isLoginPage && (
              <>
                <li>
                  <Link to="/auction-house">Auction House</Link>
                </li>
                <li>
                  <Link to="/my-profile">Profile</Link>
                </li>
                <li onClick={handleLogout}>Log Out</li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
};

export default NavBar;
