import React from 'react';
import Page from 'components/Page';

import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  CardText,
  Row,
  Col,
} from 'reactstrap';

class DeveloperPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DeveloperPage"
        title="Developers"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >

      <Row>
        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="https://media.licdn.com/dms/image/C5603AQETwoWAUpTnpw/profile-displayphoto-shrink_800_800/0?e=1527156000&v=alpha&t=p4ptmy1HvsgGE1HOfgHSR0pyV1eumlMken5OfENnXn4" />
            <CardBody>
              <CardTitle>Kyle Harrison</CardTitle>
              <CardText>
                Software Engineer{' '}
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="https://media.licdn.com/dms/image/C5103AQEwHGfV_htxZA/profile-displayphoto-shrink_800_800/0?e=1527156000&v=alpha&t=8DiU9iB0UtxGtaeZiH8WLQlZyyi7EdlhnJ5bS8vie8k" />
            <CardBody>
              <CardTitle>Ewa Graboweskia</CardTitle>
              <CardText>
                Graduate Software Developer
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="/img/bg/background_1920-11.jpg" />
            <CardBody>
              <CardTitle>Ewa Graboweskia</CardTitle>
              <CardText>
                Graduate Software Developer
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="/img/bg/background_1920-11.jpg" />
            <CardBody>
              <CardTitle>Ewa Graboweskia</CardTitle>
              <CardText>
                Graduate Software Developer
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="/img/bg/background_1920-11.jpg" />
            <CardBody>
              <CardTitle>Ewa Graboweskia</CardTitle>
              <CardText>
                Graduate Software Developer
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col md={2} sm={2} xs={12} className="mb-2">
          <Card>
            <CardImg top src="/img/bg/background_1920-11.jpg" />
            <CardBody>
              <CardTitle>Ewa Graboweskia</CardTitle>
              <CardText>
                Graduate Software Developer
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      </Page>
    );
  }
}
export default DeveloperPage;
