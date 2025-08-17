import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "../components/Logo"
import HamburgerMenu from "./HamburgerMenu"

function PageNav() {
    const navLinks = (
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.signup}>Sign Up</NavLink>
        </li>
      </ul>
    );

    return (
      <nav className={styles.nav}>
        <Logo />
        <div className={styles.desktopNav}>{navLinks}</div>
        <HamburgerMenu>
          <ul>
            <li>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/login" >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </HamburgerMenu>
      </nav>
    );
}

export default PageNav