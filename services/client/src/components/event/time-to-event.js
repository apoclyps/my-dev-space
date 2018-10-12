import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimeToEvent = ({ startTime }) => {
  const now = moment();
  const eventTime = moment.utc(startTime);
  const duration = moment.duration(eventTime.diff(now));

  return (
    <React.Fragment>
      <style jsx>{`
        span {
          color: #989fa5;
          font-style: italic;
          font-weight: 500;
        }
      `}</style>
      <span className="humanize">
        - {duration > 0 ? "next" : "last"} event {duration.humanize(true)}
      </span>
    </React.Fragment>
  );
};

TimeToEvent.propTypes = {
  startTime: PropTypes.string.isRequired
};

export default TimeToEvent;
