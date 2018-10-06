const eventsApi = "https://calendar.google.com/calendar/ical/farsetlabs.org.uk_srmqnkn373auq51u00s2nijrq8%40group.calendar.google.com/public/basic.ics";

module.exports = {
  bucketName: "farsetlabs-events-bucket",
  getEventsUrl: () => eventsApi
};
