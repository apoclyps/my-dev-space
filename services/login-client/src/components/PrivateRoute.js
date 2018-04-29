import {connect} from 'react-redux'

import PrivateRouteContainer from '../containers/PrivateRoute';

const PrivateRoute = connect(state => ({isAuthenticated: state.authReducer.isAuthenticated}))(PrivateRouteContainer)

export default PrivateRoute;
