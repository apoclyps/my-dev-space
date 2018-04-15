import React from 'react';
import Page from 'components/Page';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import {
  userProgressTableData,
} from 'demos/dashboardPage';

import {
  MdPersonPin,
} from 'react-icons/lib/md';
import UserProgressTable from 'components/UserProgressTable';

class EventPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="EventPage"
        title="Events"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >

      <Row>

        <Col md="12" sm="12" xs="12">
          <Card>
            <CardHeader>New Meetups</CardHeader>
            <CardBody>
              <UserProgressTable
                headers={[
                  <MdPersonPin size={25} />,
                  'name',
                  'date',
                  'participation',
                  '%',
                ]}
                usersData={userProgressTableData}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      </Page>
    );
  }
}
export default EventPage;
