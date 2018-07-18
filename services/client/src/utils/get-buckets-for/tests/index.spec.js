import eventsForEveryBuckets from './test-data/events-for-every-buckets';
import eventsForSomeBuckets from './test-data/events-for-some-buckets';
import getBucketsFor from '../';

jest.mock('moment', () => (input) => {
  return require.requireActual('moment')(input || '2017-06-15T08:00:00');
});

describe('get-buckets-for', function () {
  it('should create empty buckets', function () {
    expect(getBucketsFor([])).toMatchSnapshot();
  });

  it('should add events to every bucket', function () {
    expect(getBucketsFor(eventsForEveryBuckets)).toMatchSnapshot();
  });

  it('should add events to some buckets', function () {
    expect(getBucketsFor(eventsForSomeBuckets)).toMatchSnapshot();
  });
});
