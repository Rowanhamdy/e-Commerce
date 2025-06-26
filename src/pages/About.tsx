import { Heading } from "@components/Common";
import aboutImage from "@assets/images/square-8-800x760.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLeaf,
  faUserGroup,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "@styles/global.css";

export default function About() {
  return (
    <div className="">
      <div className="bg-all ">
      {/* Header Section */}
      <div className="container d-flex justify-content-between align-items-center mt-5 position-relative">
        <Heading title="About" />
        <p className="mt-5">
          <Link to="/" className="text-decoration-none my-font">
            Home
          </Link>{" "}
          / About
        </p>
      </div>

      {/* About Content Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src={aboutImage}
              alt="About us"
              className="img-fluid w-75 border"
            />
          </div>
          <div className="col-md-6">
            <h2 className="my-font">Who we are?</h2>
            <p className="mt-3">
              We have been operating for over 30 years and are members of
              The Federation of Master Builders. From small residential
              extensions to full house builds, we handle projects of all sizes.
              We're thrilled with this theme—it truly enhances our daily work!
            </p>

            <ul className="list-unstyled mt-4">
              <li className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faLeaf} className="me-2 my-icons" />
                We care about the environment.
              </li>
              <li className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faUserGroup} className="me-2 my-icons" />
                Trusted by hundreds of clients.
              </li>
              <li className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faHeart} className="me-2 my-icons" />
                Social media loves us!
              </li>
              <li className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCheck} className="me-2 my-icons" />
                Easy-to-read benefits list.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-all text-center py-5">
        <div className="container">
          <h2 className="mb-3">Our Team</h2>
          <p className="fw-semibold mb-5">Learn more about our fantastic team!</p>

          <div className="row g-4 justify-content-center">
            {[
              { name: "John Doe", role: "Web Designer" },
              { name: "Alice Doen", role: "Web Designer" },
              { name: "Bernard Smith", role: "Designer" },
              { name: "Katie Holmes", role: "Designer" },
            ].map((member, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <div className="bg-team my-color p-3 rounded shadow-sm">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="d-flex justify-content-center align-items-center text-center mt-5 py-5">
        <div>
          <h2 className="my-font mb-4">How about shopping?</h2>
          <p className="fw-semibold mb-5">Check all our products.</p>
          <Link
            to="/categories"
            className="text-decoration-none mt-5 text-light bg-btn p-3 rounded-1 text-capitalize"
          >
            Visit shop
          </Link>
        </div>
      </div>
    </div>
    </div>
    
  );
}
