process.env.GOOGLE_CALENDAR_API_TOKEN = "google-calendar-token-abc123";

const { prefix, resolved, resolvedResponse } = require("../test-utils");
const { getFromWeb } = require(`${prefix}/node_modules/aws-lambda-data-utils`);
const { uploadTo } = require(`${prefix}/node_modules/@muxer/lambda-utils`);
const producer = require(`${prefix}/handlers/producer`);

const apicall =
  "https://www.googleapis.com/calendar/v3/calendars/farsetlabs.org.uk_srmqnkn373auq51u00s2nijrq8%40group.calendar.google.com/events?maxResults=2500&singleEvents=true&orderBy=startTime&timeMin=2018-11-06T10:30:00.000Z&timeMax=2019-11-06T10:30:00.000Z&key=google-calendar-token-abc123";

const event = null;
const context = null;

describe("Farsetlabs Producer", function() {
  beforeEach(function() {
    const NativeDate = Date;
    global.Date = jest.fn(
      input => new NativeDate(input || "2018-11-06T10:30:00")
    );
    jest.clearAllMocks();
    uploadTo.mockImplementation(resolved({ key: "path/to/new/file.json" }));
  });

  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });

  describe("when the calendar events are returned", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(() => resolvedResponse({ items: [] }));
    });

    it("makes a request to the API", function(done) {
      producer.produce(event, context, function(err) {
        expect(getFromWeb).toHaveBeenCalledTimes(1);
        expect(getFromWeb).toHaveBeenCalledWith(apicall);
        done(err);
      });
    });

    it("uploads data", function(done) {
      producer.produce(event, context, function(err) {
        expect(uploadTo).toHaveBeenCalledTimes(1);
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-farsetlabs",
          expect.any(Function),
          { items: [] }
        );
        done(err);
      });
    });

    it("returns file paths", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(response).toEqual({ message: ["path/to/new/file.json"] });
        done(err);
      });
    });
  });
});
