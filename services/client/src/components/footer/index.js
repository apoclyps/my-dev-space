import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./styles";

const Footer = () => (
  <div className="footer">
    <style jsx>{styles}</style>
    <div>
      &copy; 2018 | Site by
      <a href="https://twitter.com/apoclyps">
        <FontAwesome name="twitter" />
        {" Kyle Harrison"}
      </a>
    </div>
  </div>
);

export default Footer;
