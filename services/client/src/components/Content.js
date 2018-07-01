import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const formatTitle = str =>
  str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());

const TimeToEvent = ({ startTime }) => {
  if (!startTime) return null;

  const now = moment();
  const eventTime = moment.utc(startTime);
  const duration = moment.duration(eventTime.diff(now));

  return (
    <span className="text-grey-light italic">
      {duration > 0 ? "next" : "last"} event {duration.humanize(true)}
    </span>
  );
};

TimeToEvent.propTypes = {
  startTime: PropTypes.string
};

TimeToEvent.defaultProps = {
  startTime: undefined
};

const EventIcon = ({ source }) => {
  let eventSourceImage = "";
  if (source === "eventbrite") {
    eventSourceImage =
      "http://adultandchild.org/wp-content/uploads/2014/08/Eventbrite-Icon.png";
  } else if (source === "meetup") {
    eventSourceImage =
      "https://assets.materialup.com/uploads/30b4082d-3390-44d6-973e-60ca8972f854/preview";
  } else if (source === "nisciencefestival") {
    eventSourceImage =
      "https://i2.wp.com/www.belfasttimes.co.uk/wp-content/uploads/2016/02/NISF2016_FINAL.jpg?fit=1181%2C1181";
  }

  if (eventSourceImage !== "") {
    return (
      <img
        className="event-content-icon"
        src={eventSourceImage}
        alt={`${source} icon`}
      />
    );
  }

  return (
    <i
      className="rounded-full mt-2 fa fa-calendar-o event-content-icon"
      alt="Event icon"
    />
  );
};

EventIcon.propTypes = {
  source: PropTypes.string
};

EventIcon.defaultProps = {
  source: undefined
};

const Content = ({ className, content }) => {
  const {
    id,
    name,
    time,
    event_url: eventUrl,
    group_name: groupName,
    source
  } = content;

  const groupNameStyle = {
    paddingRight: "0.3rem"
  };

  return (
    <div
      id={id}
      className={`bg-white border-grey-lightest flex p-2 shadow-light hover:shadow ${className}`}
    >
      <div className="ml-2">
        <EventIcon source={source} />
      </div>
      <div className="w-3/4">
        <div className="ml-4 mt-1">
          <div className="mb-2">
            <a
              className="text-lg text-black font-thin no-underline"
              href={eventUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatTitle(name)}
            </a>
          </div>
          <div className="text-xs text-grey">
            <span style={groupNameStyle}>{groupName}</span>
            <TimeToEvent startTime={time} />
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
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

Content.defaultProps = {
  className: ""
};

export default Content;
