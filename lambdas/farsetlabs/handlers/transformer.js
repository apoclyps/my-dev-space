"use strict";

const icalendar = require('icalendar');
const { getFromS3 } = require("aws-lambda-data-utils");

module.exports.transform = async (event, context, callback) => {
  try {
    const records = event.Records;

    const eventsCount = await Promise.all(await records.map(async function ({
      s3: { bucket, object: file }
    }) {
      const calendarFile = await getFromS3(bucket.name, file.key);
      const calendar = icalendar.parse_calendar(calendarFile.Body.toString('utf-8'));

      // TODO: Update this to convert to standardised event format
      //       Don't foget to remove events in the past
      return calendar.events().length;
    }));

    // TODO: Update this to output standardised event to publish bucket
    console.log("eventsCount", JSON.stringify(eventsCount));

    callback(null, { message: eventsCount });
  } catch (err) {
    callback(err, null);
  }
};
