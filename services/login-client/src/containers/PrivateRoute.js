import React from 'react'
import {Route} from 'react-router'
import {Redirect} from 'react-router-dom'

class PrivateRouteContainer extends React.Component {
  render() {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

    return (<Route {...props} render={props => isAuthenticated
        ? <Component {...props}/>
        : (<Redirect to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }}/>)}/>)
  }
}

export default PrivateRouteContainer;
