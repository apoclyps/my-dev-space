jest.mock("../../meetupcom/node_modules/aws-lambda-data-utils", () => ({
  getFromWeb: jest.fn(),
  getFromS3: jest.fn()
}));

jest.mock("../../meetupcom/node_modules/@muxer/lambda-utils", () =>
  Object.assign(
    require.requireActual("../../meetupcom/node_modules/@muxer/lambda-utils"),
    {
      uploadTo: jest.fn()
    }
  )
);

const prefix = "../../../meetupcom";

const resolved = data => () => Promise.resolve(data);

const resolvedResponse = data => Promise.resolve(JSON.stringify(data));

module.exports = {
  prefix,
  resolved,
  resolvedResponse
};
