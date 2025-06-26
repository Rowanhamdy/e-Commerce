import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppSelector, useAppDispatch } from "@store/hook";
import { authLogout } from "@store/auth/authSlice";
import { useEffect } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import useTheme from "@hooks/useTheme";
import mylogo from "@assets/images/images1.png";
import mylogo2 from "@assets/images/images2.png";
import styles from "./styles.module.css";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import actLoadCartFromAPI from "@store/cart/act/actLoadCartFromAPI";
const { navLink, navBar } = styles;

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);


    useEffect(() => {
    if (accessToken) {
      dispatch(actLoadCartFromAPI()).then(() => {
        dispatch(actGetProductsByItems());
      });

      dispatch(actGetWishlist("productsIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <div className={`${navBar} fixed-top`}>
      <Navbar
        expand="lg"
        className="ps-2 pe-2"
        variant={theme === "light" ? "light" : "dark"}
      >
        <Container className="d-flex  justify-content-between align-items-center  px-0">
          <Navbar.Brand className="p-0 m-0">
            <img
              src={theme === "light" ? mylogo : mylogo2}
              alt="logo"
              style={{ width: "100px" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link className={navLink} as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link className={navLink} as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link className={navLink} as={NavLink} to="about-us">
                About
              </Nav.Link>

              {!accessToken ? (
                <>
                  <Nav.Link className={navLink} as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link className={navLink} as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={
                    <span className={navLink}>Welcome {user?.firstName}</span>
                  }
                  id="basic-nav-dropdown"
                  className={navLink}
                >
                  <NavDropdown.Item as={NavLink} to="profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    onClick={() => {
                      dispatch(authLogout());
                    }}
                  >
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <Nav.Link
                onClick={toggleTheme}
                className={`${navLink} fs-5  ps-2 pe-3`}
              >
                <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
              </Nav.Link>

              <div>
                <HeaderLeftBar />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
