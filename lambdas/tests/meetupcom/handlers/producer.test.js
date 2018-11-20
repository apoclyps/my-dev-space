process.env.MEETUPCOM_API_TOKEN = "meetupcom-token-abc123";

const { prefix, resolved } = require("../test-utils");
const { getFromWeb } = require(`${prefix}/node_modules/aws-lambda-data-utils`);
const { uploadTo } = require(`${prefix}/node_modules/@muxer/lambda-utils`);
const producer = require(`${prefix}/handlers/producer`);
const identity = value => value;

const requireData = (filename, transform = identity) =>
  JSON.stringify(transform(require(`./test-data/${filename}.json`))); // eslint-disable-line global-require

const erroredGroupsData = requireData("groups-payload-error");
const populatedGroupsData = requireData("groups-payload-populated");
const emptyGroupsData = requireData("groups-payload-empty");
const erroredGroupEventssData = requireData("group-events-payload-error");
const emptyGroupEventsData = requireData("group-events-payload-empty");

const groupsUrl =
  "https://api.meetup.com/find/groups?photo-host=public&country=GB&lon=-6.762739&lat=54.6425126&radius=60&fields=approved,best_topics,description_images,past_event_count_inclusive,group_past_event_count,plain_text_description,plain_text_no_images_description,topics&fallback_suggestions=false&category=34&page=200&sign=true&key=meetupcom-token-abc123";

const matchGroupEventsUrl = url =>
  url.match(
    /https:\/\/api\.meetup\.com\/(.+)\/events\?photo-host=public&status=cancelled,past,proposed,suggested,upcoming&page=200/
  );

const getGroupEventsUrl = groupName =>
  `https://api.meetup.com/${groupName}/events?photo-host=public&status=cancelled,past,proposed,suggested,upcoming&page=200`;

const groupEventsTransform = groupName => events =>
  events.map(event =>
    Object.assign({}, event, {
      description: `${event.description} [${groupName}]`
    })
  );

const requireEventsFor = group =>
  requireData("group-events-payload-populated", groupEventsTransform(group));

const groupedErroredResponse = resolved(erroredGroupsData);
const groupsPopulatedResponse = resolved(populatedGroupsData);
const groupsEmptyResponse = resolved(emptyGroupsData);
const groupEventsErroredResponse = resolved(erroredGroupEventssData);
const groupEventsPopulatedResponse = group =>
  Promise.resolve(requireEventsFor(group));
const groupEventsEmptyResponse = resolved(emptyGroupEventsData);

const event = null;
const context = null;

describe("Meetup.com Producer", function() {
  beforeEach(function() {
    jest.clearAllMocks();
    uploadTo.mockImplementation(resolved({ key: "path/to/new/file.json" }));
  });

  it("is a lambda handler", function() {
    expect(typeof producer).toBe("object");
    expect(typeof producer.produce).toBe("function");
  });

  describe("when an error is returned from groups request", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(url => {
        if (url === groupsUrl) return groupedErroredResponse();
        throw new Error("Mock setup mismatch");
      });
    });

    it("makes a request to the API for groups data", function(done) {
      producer.produce(event, context, function() {
        expect(getFromWeb).toHaveBeenCalledTimes(1);
        expect(getFromWeb).toHaveBeenCalledWith(groupsUrl);
        done();
      });
    });

    it("returns an error and no file paths", function(done) {
      producer.produce(event, context, function(err, response) {
        expect(err).toEqual([
          {
            code: "auth_fail",
            message: "Invalid signature"
          }
        ]);
        expect(response).toBe(null);
        done();
      });
    });

    it("does not upload data", function(done) {
      producer.produce(event, context, function() {
        expect(uploadTo).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe("when no groups are returned", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(url => {
        if (url === groupsUrl) return groupsEmptyResponse();
        throw new Error("Mock setup mismatch");
      });
    });

    it("makes a request to the API for groups data", function(done) {
      producer.produce(event, context, function(err) {
        expect(getFromWeb).toHaveBeenCalledTimes(1);
        expect(getFromWeb).toHaveBeenCalledWith(groupsUrl);
        done(err);
      });
    });

    it("uploads data", function(done) {
      producer.produce(event, context, function(err) {
        expect(uploadTo).toHaveBeenCalledTimes(1);
        expect(uploadTo).toHaveBeenCalledWith(
          "muxer-produced-events-meetupcom",
          expect.any(Function),
          []
        );
        done(err);
      });
    });
  });

  describe("when the groups are returned", function() {
    beforeEach(function() {
      getFromWeb.mockImplementation(url => {
        if (url === groupsUrl) return groupsPopulatedResponse();
        if (matchGroupEventsUrl(url)) return groupEventsEmptyResponse();
        throw new Error("Mock setup mismatch");
      });
    });

    it("makes a request to the API for groups data", function(done) {
      producer.produce(event, context, function(err) {
        expect(getFromWeb).toHaveBeenCalledWith(groupsUrl);
        done(err);
      });
    });

    it("requests data for each group", function(done) {
      producer.produce(event, context, function(err) {
        expect(getFromWeb).toHaveBeenCalledTimes(5); // + 1 for the groups URL
        expect(getFromWeb).toHaveBeenCalledWith(
          getGroupEventsUrl("AWS-Usergroup-Belfast")
        );
        expect(getFromWeb).toHaveBeenCalledWith(
          getGroupEventsUrl("Women-Who-Code-Belfast")
        );
        expect(getFromWeb).toHaveBeenCalledWith(
          getGroupEventsUrl("Belfast-Selenium-Meetup-Group")
        );
        expect(getFromWeb).toHaveBeenCalledWith(
          getGroupEventsUrl("CodeCoop-NI")
        );
        done(err);
      });
    });

    describe("and there is an error getting events", function() {
      beforeEach(function() {
        getFromWeb.mockImplementation(url => {
          if (url === groupsUrl) return groupsPopulatedResponse();
          if (matchGroupEventsUrl(url)) {
            if (url.includes("AWS-Usergroup-Belfast")) {
              return groupEventsErroredResponse();
            }
            return groupEventsPopulatedResponse("foo");
          }
          throw new Error("Mock setup mismatch");
        });
      });

      it("does not upload data", function(done) {
        producer.produce(event, context, function() {
          expect(uploadTo).not.toHaveBeenCalled();
          done();
        });
      });

      it("returns the errors and no file paths", function(done) {
        producer.produce(event, context, function(err, response) {
          expect(err).toEqual([
            [{ code: "auth_fail", message: "Invalid signature" }]
          ]);
          expect(response).toBe(null);
          done();
        });
      });
    });

    describe("and there are no events for those groups", function() {
      beforeEach(function() {
        getFromWeb.mockImplementation(url => {
          if (url === groupsUrl) return groupsPopulatedResponse();
          const eventsUrlMatch = matchGroupEventsUrl(url);
          if (eventsUrlMatch && eventsUrlMatch[1]) {
            return groupEventsEmptyResponse();
          }
          throw new Error("Mock setup mismatch");
        });
      });

      it("uploads data", function(done) {
        producer.produce(event, context, function(err) {
          expect(uploadTo).toHaveBeenCalledTimes(5);
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(populatedGroupsData)
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            []
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            []
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            []
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            []
          );
          done(err);
        });
      });

      it("returns file paths", function(done) {
        producer.produce(event, context, function(err, response) {
          expect(response).toEqual({
            message: [
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json"
            ]
          });
          done(err);
        });
      });
    });

    describe("and there are events for those groups", function() {
      beforeEach(function() {
        getFromWeb.mockImplementation(url => {
          if (url === groupsUrl) return groupsPopulatedResponse();
          const eventsUrlMatch = matchGroupEventsUrl(url);
          if (eventsUrlMatch && eventsUrlMatch[1]) {
            return groupEventsPopulatedResponse(eventsUrlMatch[1]);
          }
          throw new Error("Mock setup mismatch");
        });
      });

      it("uploads data", function(done) {
        producer.produce(event, context, function(err) {
          expect(uploadTo).toHaveBeenCalledTimes(5);
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(populatedGroupsData)
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(requireEventsFor("AWS-Usergroup-Belfast"))
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(requireEventsFor("Women-Who-Code-Belfast"))
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(requireEventsFor("Belfast-Selenium-Meetup-Group"))
          );
          expect(uploadTo).toHaveBeenCalledWith(
            "muxer-produced-events-meetupcom",
            expect.any(Function),
            JSON.parse(requireEventsFor("CodeCoop-NI"))
          );
          done(err);
        });
      });

      it("returns file paths", function(done) {
        producer.produce(event, context, function(err, response) {
          expect(response).toEqual({
            message: [
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json",
              "path/to/new/file.json"
            ]
          });
          done(err);
        });
      });
    });
  });
});
