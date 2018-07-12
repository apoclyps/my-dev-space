import React from "react";
import PropTypes from "prop-types";
import styles from "./styles";

const NoEvents = ({ className }) => (
  <div className={`no-events ${className}`}>
    <style jsx>{styles}</style>
    No Events
  </div>
);

NoEvents.propTypes = {
  className: PropTypes.string
};

NoEvents.defaultProps = {
  className: ""
};

export default NoEvents;
