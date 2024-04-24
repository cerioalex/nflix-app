import "../App.css";
import React from "react";
import Button from "@mui/material/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="row-centered">
          <Button variant="text" sx={{ color: "#fff" }}>
            Terms of Use
          </Button>
          <Button variant="text" sx={{ color: "#fff" }}>
            Privacy Policy
          </Button>
          <Button variant="text" sx={{ color: "#fff" }}>
            {" "}
            About
          </Button>
          <Button variant="text" sx={{ color: "#fff" }}>
            Blog
          </Button>
          <Button variant="text" sx={{ color: "#fff" }}>
            FAQ
          </Button>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="social-icons">
        <span className="icon">
          <FaFacebookF />
        </span>
        <span className="icon">
          <FaInstagram />
        </span>
        <span className="icon">
          <FaTwitter />
        </span>
        <span className="icon">
          <FaLinkedin />
        </span>
      </div>
    </div>
  );
};

export default Footer;
