import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from 'reactstrap';

import {
  MdPersonPin,
} from 'react-icons/lib/md';

import {
  productsData,
  userProgressTableData,
} from 'demos/dashboardPage';

import Page from 'components/Page';

import ProductMedia from 'components/ProductMedia';
import UserProgressTable from 'components/UserProgressTable';

import { NumberWidget } from 'components/Widget';

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Upcoming Events"
              subtitle="This month"
              number="15"
              color="secondary"
              progress={{
                value: 50,
                label: 'Increased',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Active Projects"
              subtitle="This month"
              number="34"
              color="secondary"
              progress={{
                value: 45,
                label: 'Increased',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Available Mentors"
              subtitle="This month"
              number="16"
              color="secondary"
              progress={{
                value: 90,
                label: 'Increased',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Active Speakers"
              subtitle="This month"
              number="38"
              color="secondary"
              progress={{
                value: 60,
                label: 'Increased',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Projects</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      right={right}
                    />
                  )
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>New Developers</CardHeader>
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
export default DashboardPage;
