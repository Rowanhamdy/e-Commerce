import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faCartShopping,
  faHeart,
  faList
} from "@fortawesome/free-solid-svg-icons";

import {
  FaHome,
  FaUser,
} from "react-icons/fa";

import styles from "./styles.module.css";

const { footerContainer, textColor, iconColor } = styles;

export default function Footer() {
  return (
    <div className={`${footerContainer} py-5`}>
      <div className="container">
        <div className="row">
          {/* Brand Info */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h2 className="h5 fw-medium">Rowan Hamdy</h2>
            <p>
              "I create responsive and user-friendly websites using modern tools and clean code."
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h2 className="h5 fw-medium">Quick Links</h2>
            <ul className="list-unstyled ps-5 ms-5">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaHome className={iconColor} />
                <Link to="/" className={`text-decoration-none ${textColor}`}>
                  Home
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaUser className={iconColor} />
                <Link to="/about-us" className={`text-decoration-none ${textColor}`}>
                  About
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faList} className={iconColor} />
                <Link to="/categories" className={`text-decoration-none ${textColor}`}>
                  Categories
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className={iconColor} />
                <Link to="/wishlist" className={`text-decoration-none ${textColor}`}>
                  Wishlist
                </Link>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faCartShopping} className={iconColor} />
                <Link to="/cart" className={`text-decoration-none ${textColor}`}>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h2 className="h5 fw-medium">Get In Touch</h2>
            <ul className="list-unstyled ps-5 ms-5">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className={iconColor} />
                <a
                  href="mailto:rowaaamhamdy2001@gmail.com"
                  className={`text-decoration-none ${textColor}`}
                >
                  rowaaamhamdy2001@gmail.com
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className={iconColor} />
                <span>+2 01211836843</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} className={iconColor} />
                <span>Egypt</span>
              </li>
            </ul>
          </div>

          {/* Social / Connect */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h2 className="h5 fw-medium">Connect</h2>
            <p>Coming soon...</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="mb-0">© 2025 Rowan Hamdy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
