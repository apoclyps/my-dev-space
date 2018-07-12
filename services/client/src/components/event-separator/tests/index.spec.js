import React from 'react';
import EventSeparator from '../';

describe('event-separator', function () {
  it('renders', function () {
    expect(<EventSeparator id='test-id' content='Test Content' />).toMatchSnapshot();
  });
});
