import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import Navigation from "./navigation";
import styles, { linkStyles, iconStyles } from "./styles";

const Header = () => (
  <div className="header">
    <style jsx>{styles}</style>
    {linkStyles.styles}
    {iconStyles.styles}
    <div className="header__title">
      <Link className={`header__title__link ${linkStyles.className}`} to="/">
        <FontAwesome
          name="chevron-right"
          className={`homepage-icon ${iconStyles.className}`}
        />
        <span className="homepage-title">Muxer</span>
      </Link>
    </div>
    <Navigation />
  </div>
);

export default Header;
