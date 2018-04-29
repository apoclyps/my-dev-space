import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import LoginContainer from '../containers/Login';

const authSuccess = () => ({
  type: 'AUTH_SUCCESS'
})

const Login = connect(null, dispatch => ({
  login: () => {
    dispatch(authSuccess())
    dispatch(push('/'))
  }
}))(LoginContainer)

export default Login;
