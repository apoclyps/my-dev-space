import React from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import Content from "./content";
import styles from "./styles";

const Event = ({ className, content }) => {
  const {
    name,
    time,
    event_url: eventUrl,
    group_name: groupName,
    source
  } = content;

  return (
    <div className={`event ${className}`}>
      <style jsx>{styles}</style>
      <div className="event-icon">
        <Icon source={source} />
      </div>
      <div className="event-content">
        <Content
          name={name}
          time={time}
          eventUrl={eventUrl}
          groupName={groupName}
        />
      </div>
    </div>
  );
};

Event.propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    event_url: PropTypes.string.isRequired,
    group_name: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }).isRequired
};

Event.defaultProps = {
  className: ""
};

export default Event;
