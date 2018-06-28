import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import CallToActionBanner from "../components/CallToActionBanner";
import Content from "../components/Content";

const updateEventsList = function(eventsList) {
  const events = _.map(eventsList, function(item) {
    return _.extend({}, item, { timestamp: moment(item.time).valueOf() });
  });
  return _.orderBy(events, ["timestamp"], ["asc"]);
};

class Events extends Component {
  state = {};

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    const options = {
      url: `${process.env.REACT_APP_EVENTS_SERVICE_URL}/events`,
      method: "get"
    };

    return axios(options)
      .then(({ data }) => {
        this.setState({
          upcomingEvents: updateEventsList(data.data.upcoming_events),
          recentEvents: updateEventsList(data.data.recent_events)
        });
      })
      .catch(error => {
        console.log("events error: " + error);
      });
  }

  renderRecentEvents() {
    const { recentEvents } = this.state;

    if (!_.isArray(recentEvents)) return <div>Loading...</div>;

    return (
      <div className="border-t border-l border-r border-yellow-dark">
        {recentEvents.map(item => (
          <Content
            key={item.id}
            className="bg-yellow-lighter border-b border-yellow-dark"
            content={item}
          />
        ))}
      </div>
    );
  }

  renderUpcomingEvents() {
    const { upcomingEvents } = this.state;

    if (!_.isArray(upcomingEvents)) return <div>Loading...</div>;

    return (
      <div>
        {upcomingEvents.map(item => (
          <Content key={item.id} className="border" content={item} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <CallToActionBanner />
        {this.renderRecentEvents()}
        {this.renderUpcomingEvents()}
      </div>
    );
  }
}

export default Events;
