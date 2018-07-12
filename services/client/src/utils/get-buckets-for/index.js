import _ from "lodash";
import moment from "moment";

const sameTimePeriod = period => ({ time }) =>
  moment().isSame(moment(time), period);

const withinDays = days => ({ time }) =>
  moment(time).diff(moment(), "days") <= days;

const buckets = [
  { id: "today", check: sameTimePeriod("day"), message: "Today" },
  {
    id: "this-week",
    check: sameTimePeriod("week"),
    message: "This Week"
  },
  {
    id: "in-next-thirty-days",
    check: withinDays(30),
    message: "Next 30 days"
  },
  {
    id: "in-next-three-months",
    check: withinDays(110),
    message: "Next 3 months"
  },
  { id: "in-the-future", check: () => true, message: "And beyond..." }
];

export default function(upcomingEvents) {
  const bucketedEvents = _.reduce(
    upcomingEvents,
    (bucketed, upcomingEvent) => {
      const { id } = _.find(buckets, ({ check }) => check(upcomingEvent));
      return {
        ...bucketed,
        [id]: (bucketed[id] || []).concat(upcomingEvent)
      };
    },
    {}
  );

  return _.map(buckets, ({ id, message }) => ({
    id,
    message,
    className: `events-${id}`,
    events: bucketedEvents[id] || []
  }));
}
