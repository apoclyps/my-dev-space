import React from 'react';
import Page from 'components/Page';

class ProjectPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="ProjectPage"
        title="Projects"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >

      </Page>
    );
  }
}
export default ProjectPage;
