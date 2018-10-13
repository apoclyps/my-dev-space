"use strict";

const {
  createHash,
  getDateTimePathFor,
  getFromWeb,
  setInS3
} = require("aws-lambda-data-utils");
const { bucketName, getEventsUrl } = require("../config");

const uploadTo = function(createFilename, data) {
  const fileContents = JSON.stringify(data);
  const today = new Date();
  const hash = createHash(fileContents);
  const prefix = getDateTimePathFor(today);
  const filename = createFilename(today, hash);
  const filePath = `${prefix}/${filename}`;

  return setInS3(prefix, bucketName, filePath, fileContents);
};

const uploadData = function(calendarData) {
    return uploadTo(
      (today, hash) =>
        `farset-labs-calendar__${today.valueOf()}__${hash}.json`,
        calendarData
    );
};

module.exports.produce = async (event, context, callback) => {
  try {
    // Read list of upcoming events
    const calendarData = JSON.parse(await getFromWeb(getEventsUrl()));

    // Write captured data to S3
    const message = (await uploadData(calendarData)).key;

    callback(null, { message });
  } catch (err) {
    callback(err, null);
  }
};
