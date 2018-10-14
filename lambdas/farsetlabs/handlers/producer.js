"use strict";

const { getFromWeb } = require("aws-lambda-data-utils");
const { buckets, getEventsUrl } = require("../config");
const { uploadData } = require("../utils");

module.exports.produce = async (event, context, callback) => {
  try {
    const calendarData = JSON.parse(await getFromWeb(getEventsUrl()));
    const { producerBucket } = buckets();
    const filePath = (await uploadData(producerBucket, calendarData)).key;

    callback(null, { message: filePath });
  } catch (err) {
    callback(err, null);
  }
};
