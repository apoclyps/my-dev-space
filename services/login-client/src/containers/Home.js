import React from 'react'

class HomeContainer extends React.Component {
  componentWillMount() {
    alert('Private home is at: ' + this.props.location.pathname)
  }

  render() {
    return <button onClick={this.props.logout}>Logout Here!</button>
  }
}

export default HomeContainer;
