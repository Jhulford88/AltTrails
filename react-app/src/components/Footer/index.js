import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <div className="footer-headers">Developed By</div>
        <div className="person-container">
          <p className="name">Joshua Hulford</p>
          <div className="link-container-left">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/joshua-hulford/"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a target="_blank" href="https://github.com/Jhulford88">
              <i class="fa-brands fa-square-github"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-headers">Technologies</div>
        <div className="link-container-right">
          <div>
            <i class="fa-brands fa-square-js"></i>
          </div>
          <div>
            <i class="fa-brands fa-react"></i>
          </div>
          <div>
            <i class="fa-brands fa-python"></i>
          </div>
          <div>
            <i class="fa-brands fa-html5"></i>
          </div>
          <div>
            <i class="fa-brands fa-css3-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
